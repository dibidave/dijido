
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

  if(status.min_time !== null) {
    start = today.clone().startOf(status.time_unit);
    start.add(status.min_time, status.time_unit);
    start.toDate();
  }

  if(status.max_time !== null) {
    end = today.clone().endOf(status.time_unit);
    end.add(status.max_time, status.time_unit);
    end.toDate();
  }

  return {
    "start": start,
    "end": end
  }
};