import SwapRequest from "../models/swap.models.js";
import Item from "../models/item.models.js";

/**
 * Request a swap
 */
export const requestSwap = async (req, res) => {
  try {
    const { requestedItemId, offeredItemId } = req.body;

    const requestedItem = await Item.findById(requestedItemId);
    if (!requestedItem || !requestedItem.approved || requestedItem.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Requested item is not available for swap.",
      });
    }

    // Validate offered item if provided
    if (offeredItemId) {
      const offeredItem = await Item.findById(offeredItemId);
      if (!offeredItem || offeredItem.uploader.toString() !== req.id) {
        return res.status(400).json({
          success: false,
          message: "Invalid offered item.",
        });
      }
    }

    const swapRequest = await SwapRequest.create({
      requester: req.id,
      requestedItem: requestedItemId,
      offeredItem: offeredItemId || null,
    });

    res.status(201).json({
      success: true,
      message: "Swap request submitted.",
      swapRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Update swap status (accept/reject/complete)
 */
export const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const swapRequest = await SwapRequest.findById(req.params.id).populate("requestedItem");

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found.",
      });
    }

    // Only uploader of the requested item can update
    if (swapRequest.requestedItem.uploader.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this swap request.",
      });
    }

    swapRequest.status = status;
    await swapRequest.save();

    // If accepted, mark item as swapped
    if (status === "accepted" || status === "completed") {
      swapRequest.requestedItem.status = "swapped";
      await swapRequest.requestedItem.save();
    }

    res.json({
      success: true,
      message: "Swap request updated.",
      swapRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Cancel swap request
 */
export const cancelSwap = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found.",
      });
    }

    if (swapRequest.requester.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this swap.",
      });
    }

    if (swapRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Swap request cannot be cancelled.",
      });
    }

    swapRequest.status = "cancelled";
    await swapRequest.save();

    res.json({
      success: true,
      message: "Swap request cancelled.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
