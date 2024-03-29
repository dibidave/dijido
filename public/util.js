function Util() {}

Util.get_date_range_for_status = function(status) {

  if(status.time_unit === null) {
    return {
      "start": null,
      "end": null
    }
  }

  let today = moment().clone().subtract(datastore.config.end_of_day_offset, "hours");
  let start = null;
  let end = null;
  let time_unit = null;
  let time_unit_to_add = null;

  if(status.time_unit === "workday") {
    time_unit = "day";
  }
  else {
    time_unit = status.time_unit;
  }

  if(status.time_unit === "isoWeek") {
    time_unit_to_add = "week";
  }
  else {
    time_unit_to_add = status.time_unit;
  }

  if(status.min_time !== null) {

    start = today.clone().startOf(time_unit);
    start.add(status.min_time, time_unit_to_add);

    if(status.time_unit === "workday") {
      while(start.isoWeekday() > 5) {
        start.add(1, "day");
      }
    }
    start.toDate();
  }

  if(status.max_time !== null) {
    end = today.clone().endOf(time_unit);

    end.add(status.max_time, time_unit_to_add);

    if(status.time_unit === "workday") {
      while(end.isoWeekday() > 5) {
        end.add(1, "day");
      }
    }

    end.add(datastore.config.end_of_day_offset, "hours");

    end.toDate();
  }

  var range = {
    "start": start,
    "end": end
  };

  return range;
};
