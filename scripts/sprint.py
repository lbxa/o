#!/usr/bin/env python3

from datetime import date, timedelta


def get_sprint_number():
    # Get today's date
    today = date.today()

    # Define the sprint start date (January 1st, 2025)
    sprint_start = date(2025, 1, 1)

    # Calculate the difference in days
    days_diff = (today - sprint_start).days

    # If today is before the first sprint, return a message
    if days_diff < 0:
        return "Current date is before the first sprint (Jan 1, 2025)"

    # Calculate sprint number (2 weeks = 14 days)
    sprint_length = 14
    sprint_number = (days_diff // sprint_length) + 1

    # Calculate the start and end dates of the current sprint
    sprint_start_days = (sprint_number - 1) * sprint_length
    sprint_start_date = sprint_start + timedelta(days=sprint_start_days)
    sprint_end_date = sprint_start_date + timedelta(days=sprint_length - 1)

    return f"Today ({today}) is in Sprint {sprint_number}\nSprint Start: {sprint_start_date}\nSprint End: {sprint_end_date}"


# Run the script
print(get_sprint_number())
