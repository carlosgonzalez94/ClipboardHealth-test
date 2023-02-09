# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Tickets:
1) Add a new column for the custom identification in the Agents table.
    Description: You must create a new column in the Agents table that will be filled with a null value for all the agents that currently exists.
    You must use a migration to do that. Check the up and down methods before merge.

2) Update the function `getShiftsByFacility` to include the information of the agent.
    Description: The function getShiftsByFacility must return the custom id of the agent if it exists, otherwise must return the id stored in the table by default
    You must create unit test covering the 2 cases: 1 with the new custom id and 2 without this new id

3) Update the function `generateReport` to use the custom id of the agent.
    Description: The funciton generateReport must return the custom id of the agent if it exists, otherwise must return the id stored in the table by default
    You must create unit test covering the 2 cases: 1 with the new custom id and 2 without this new id

4) Update the documentation.
    Description: Update the documentation of how we generate the reports explaining that now we return the custom id if it has been configured previously