import datetime


def currentQuarter(current_month, current_day) -> str:
    # determine constraints of ucsc quarter (between which dates)
    # fall: sept 23 - dec 15
    # winter: jan 5 - mar 22
    # spring: apr 1 - jun 13
    # summer break: jun 14 - sept 23 2024

    quarters = [
        {"name": "Fall", "start": (9, 23), "end": (12, 15)},
        {"name": "Winter", "start": (1, 5), "end": (3, 22)},
        {"name": "Spring", "start": (4, 1), "end": (6, 13)},
        {"name": "Summer Break", "start": (6, 14), "end": (9, 22)},
    ]

    for quarter in quarters:
        start_month, start_day = quarter["start"]
        end_month, end_day = quarter["end"]

        if (
            (current_month > start_month or (current_month ==
             start_month and current_day >= start_day))
            and (current_month < end_month or (current_month == end_month and current_day <= end_day))
        ):
            return quarter["name"]
    return "Unknown"


def countRemaining(grad_quarter, grad_year):
    # we have our current year and month through datetime
    current_time = datetime.datetime.now()
    current_year = current_time.year
    current_month = current_time.month
    current_day = current_time.day

    appx_yr_left = grad_year - current_year
    qt_left = appx_yr_left * 3

    # depending on what quarter we are currently in:
    # subtract appropriate quarters from qt_left
    cQ = currentQuarter(current_month, current_day)
    if cQ == "Fall":
        qt_left -= 1
    elif cQ == "Winter":
        qt_left -= 2
    elif cQ == "Spring":
        qt_left -= 3

    # and depending on what the grad_quarter is:
    # subtract appropriate quarters again
    if grad_quarter == "Fall":
        qt_left -= 2
    elif grad_quarter == "Winter":
        qt_left -= 1

    return qt_left


print(countRemaining("Winter", 2029))
