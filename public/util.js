
function Util() {}

Util.get_date_range_for_status = function(status) {

  if(status.time_unit === null) {
    return {
      "start": null,
      "end": null
    }
  }

  let today = moment();
  let start = null;
  let end = null;

  today.startOf(status.time_unit);

  if(status.min_time !== null) {
    start = today.clone();
    start.add(status.min_time, status.time_unit);
    start.toDate();
  }

  if(status.max_time !== null) {
    end = today.clone();
    end.add(status.max_time, status.time_unit);
    end.toDate();
  }

  return {
    "start": start,
    "end": end
  }
};