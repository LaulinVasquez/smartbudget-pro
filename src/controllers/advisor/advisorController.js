import { createAdvisorRequest, getRequestsByUser, getRequestsForAdvisor, getRequestById, assignRequestToAdvisor, updateRequestStatus, deleteAdvisorRequest, } from "../../models/advisor/advisorRequestModel.js";

async function buildUserAdvisorRequests(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const requests = await getRequestsByUser(userId);

    return res.render("./advisor/userRequests", {
      title: "Advisor Requests",
      requests,
    });
  } catch (error) {
    next(error);
  }
}

async function submitAdvisorRequest(req, res, next) {
  try {
    const userId = req.session.user.userId;

    await createAdvisorRequest({
      userId,
      subject: req.body.subject,
      message: req.body.message,
    });

    req.flash("success", "Advisor request submitted successfully.");
    return res.redirect("/advisor-requests");
  } catch (error) {
    next(error);
  }
}

async function removeAdvisorRequest(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const requestId = req.params.requestId;

    const deletedRequest = await deleteAdvisorRequest(requestId, userId);

    if (!deletedRequest) {
      req.flash("error", "The request was not found or can no longer be deleted.");
      return res.redirect("/advisor-requests");
    }

    req.flash("success", "Advisor request deleted successfully.");
    return res.redirect("/advisor-requests");
  } catch (error) {
    next(error);
  }
}

async function buildAdvisorRequests(req, res, next) {
  try {
    const advisorId = req.session.user.userId;
    const requests = await getRequestsForAdvisor(advisorId);

    return res.render("advisor/index", {
      title: "Advisor Dashboard",
      requests,
    });
  } catch (error) {
    next(error);
  }
}

async function buildAdvisorRequestDetails(req, res, next) {
  try {
    const advisorId = req.session.user.userId;
    const requestId = req.params.requestId;
    const request = await getRequestById(requestId);

    if (!request) {
      req.flash("error", "Advisor request not found.");
      return res.redirect("/advisor");
    }

    const canViewRequest = request.advisor_id === null || Number(request.advisor_id) === Number(advisorId);

    if (!canViewRequest) {
      req.flash("error", "You do not have permission to view that request.");
      return res.redirect("/advisor");
    }

    return res.render("advisor/request", {
      title: "Advisor Request",
      request,
    });
  } catch (error) {
    next(error);
  }
}

async function acceptAdvisorRequest(req, res, next) {
  try {
    const advisorId = req.session.user.userId;
    const requestId = req.params.requestId;

    const assignedRequest = await assignRequestToAdvisor( requestId, advisorId );

    if (!assignedRequest) {
      req.flash( "error", "That request is unavailable or has already been accepted.");
      return res.redirect("/advisor");
    }

    req.flash("success", "Advisor request accepted.");
    return res.redirect(`/advisor/requests/${requestId}`);
  } catch (error) {
    next(error);
  }
}

async function changeAdvisorRequestStatus(req, res, next) {
  try {
    const advisorId = req.session.user.userId;
    const requestId = req.params.requestId;

    const updatedRequest = await updateRequestStatus(
      requestId,
      advisorId,
      req.body.status,
    );

    if (!updatedRequest) {
      req.flash("error","The request was not found or is not assigned to you.");
      return res.redirect("/advisor");
    }

    req.flash("success", "Request status updated successfully.");
    return res.redirect(`/advisor/requests/${requestId}`);
  } catch (error) {
    next(error);
  }
}
export { buildUserAdvisorRequests,submitAdvisorRequest,removeAdvisorRequest,buildAdvisorRequests, buildAdvisorRequestDetails, acceptAdvisorRequest, changeAdvisorRequestStatus };