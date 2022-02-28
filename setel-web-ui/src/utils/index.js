import moment from "moment";

export function convertTimeString(time) {
  if (!Date.parse(time)) {
    return "  ";
  }

  return moment(time).format("MM-DD-YYYY hh:mm A");
}

export function validateObjectId(_id) {
  return _id.length === 24 && !isNaN(Number("0x" + _id));
}
