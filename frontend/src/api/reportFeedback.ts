import axios, { AxiosResponse } from "axios";
import { API_URL } from "../utils/constants";

export type SubmissionData = {
  title: string;
  name: string;
  issue: string;
  attachment: string;
};

/**
 * Posts a request to the server with feedback from the user.
 * @param {SubmissionData} submissionData - The feedback information from the user.
 * @returns {Promise<AxiosResponse<any, any>>} The response from the server.
 */
const reportIssue = async (
  submissionData: SubmissionData,
): Promise<AxiosResponse<unknown, unknown>> => {
  return axios.post(`${API_URL}/feedback/report`, submissionData);
};

export default reportIssue;
