import moment from "moment";

export function convertTimeString(time) {
  if (!Date.parse(time)) {
    return "  ";
  }

  return moment(time).format("MM-DD-YYYY hh:mm A");
}
