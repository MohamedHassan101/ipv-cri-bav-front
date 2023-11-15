@mock-api:cri-bav-success @success
Feature: Continue on from landing page


   Background:
      Given Authenticatable Anita is using the system
      When they have provided their details
      Then they should be redirected to the nameEntry

   Scenario: User routed to Account Details Screen
      Given the user wishes to proceed
      When they click on the Continue button
      Then the FE app serves the Account Details screen
