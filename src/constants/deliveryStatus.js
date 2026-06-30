const DMSDELIVERY_STATUS = {
  pending: "pending",
  accepted: "accepted",
  rejected: "auto_rejected",
  assigned: "assigned",
  picked_up: "picked_up",
  in_transit: "in_transit",
  delivered: "delivered",
  failed: "failed",
  cancelled: "cancelled",
};

const ASSIGNMENT_STATUS = {
  pending: "assignment_pending",
  accepted: "assignment_accepted",
  rejected: "auto_rejected"
};

module.exports = {
  DMSDELIVERY_STATUS, 
  ASSIGNMENT_STATUS
};