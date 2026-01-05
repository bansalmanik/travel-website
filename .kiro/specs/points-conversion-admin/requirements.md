# Requirements Document

## Introduction

This document outlines the requirements for migrating the points conversion system from a large JSON file to Cloudflare D1 database with an admin UI for easy management. The system will enable administrators to add, edit, and manage credit card programs, transfer partners, and conversion rates through a web interface, while maintaining the existing user-facing points calculator functionality.

## Glossary

- **D1**: Cloudflare's serverless SQLite database that runs at the edge
- **Cloudflare Workers**: Serverless functions that run on Cloudflare's edge network
- **Admin UI**: Web-based interface for managing points conversion data
- **Program**: A credit card issuer's rewards program (e.g., Axis, HDFC, ICICI)
- **Card**: A specific credit card within a program (e.g., Axis Magnus, HDFC Infinia)
- **Partner**: A loyalty program that accepts point transfers (e.g., Singapore Airlines, Marriott Bonvoy)
- **Conversion Rate**: The ratio at which points transfer between programs (e.g., 5:4, 1:1)
- **Points Calculator**: The existing user-facing tool for calculating point transfers
- **Migration Script**: Automated tool to transfer data from JSON to D1 database
- **Wrangler**: Cloudflare's CLI tool for managing Workers and D1 databases

## Requirements

### Requirement 1

**User Story:** As a website administrator, I want to migrate existing points conversion data from JSON to Cloudflare D1, so that the data is stored in a scalable database.

#### Acceptance Criteria

1. WHEN the migration script executes THEN the system SHALL read all data from the existing points-conversion.json file
2. WHEN processing JSON data THEN the system SHALL transform it into normalized database records for programs, cards, partners, and conversion rates
3. WHEN inserting data into D1 THEN the system SHALL maintain all relationships between programs, cards, partners, and rates
4. WHEN migration completes THEN the system SHALL verify that all records were inserted successfully and report any errors
5. WHEN migration runs multiple times THEN the system SHALL handle duplicate entries gracefully without creating redundant data

### Requirement 2

**User Story:** As a website administrator, I want a secure admin interface, so that only authorized users can manage points conversion data.

#### Acceptance Criteria

1. WHEN an unauthenticated user attempts to access admin pages THEN the system SHALL redirect them to a login page
2. WHEN a user enters the correct admin password THEN the system SHALL grant access to the admin interface and create a session
3. WHEN a user session expires or logs out THEN the system SHALL require re-authentication for subsequent admin access
4. WHEN storing the admin password THEN the system SHALL use environment variables and never expose it in client-side code
5. WHEN validating credentials THEN the system SHALL use secure comparison methods to prevent timing attacks

### Requirement 3

**User Story:** As a website administrator, I want to view all programs in a dashboard, so that I can see an overview of the points conversion system.

#### Acceptance Criteria

1. WHEN the admin accesses the dashboard THEN the system SHALL display a list of all programs with their names and logos
2. WHEN displaying programs THEN the system SHALL show the count of cards and partners associated with each program
3. WHEN the admin clicks on a program THEN the system SHALL navigate to the program detail page
4. WHEN the admin clicks "Add Program" THEN the system SHALL display a form to create a new program
5. WHEN no programs exist THEN the system SHALL display a helpful message with a call-to-action to add the first program

### Requirement 4

**User Story:** As a website administrator, I want to create and edit programs, so that I can add new credit card issuers to the system.

#### Acceptance Criteria

1. WHEN the admin submits a new program form THEN the system SHALL validate that the program name is unique and not empty
2. WHEN creating a program THEN the system SHALL allow uploading a logo image and store the file path
3. WHEN editing a program THEN the system SHALL pre-populate the form with existing data
4. WHEN saving program changes THEN the system SHALL update the database and display a success confirmation
5. WHEN a validation error occurs THEN the system SHALL display clear error messages without losing user input

### Requirement 5

**User Story:** As a website administrator, I want to manage cards within programs, so that I can add new credit cards and update existing ones.

#### Acceptance Criteria

1. WHEN viewing a program detail page THEN the system SHALL display all cards associated with that program
2. WHEN the admin clicks "Add Card" THEN the system SHALL display a form to create a new card within the selected program
3. WHEN creating a card THEN the system SHALL require a card name and associate it with the parent program
4. WHEN editing a card THEN the system SHALL allow updating the card name and enabled status
5. WHEN deleting a card THEN the system SHALL prompt for confirmation and remove all associated conversion rates

### Requirement 6

**User Story:** As a website administrator, I want to manage transfer partners, so that I can add new loyalty programs that accept point transfers.

#### Acceptance Criteria

1. WHEN viewing the partners page THEN the system SHALL display all available transfer partners with their names and logos
2. WHEN the admin clicks "Add Partner" THEN the system SHALL display a form to create a new partner
3. WHEN creating a partner THEN the system SHALL validate that the partner name is unique and allow uploading a logo
4. WHEN editing a partner THEN the system SHALL allow updating the name, logo, and enabled status
5. WHEN a partner is used in conversion rates THEN the system SHALL prevent deletion and display a warning message

### Requirement 7

**User Story:** As a website administrator, I want to manage conversion rates for each card, so that users can see accurate transfer ratios.

#### Acceptance Criteria

1. WHEN viewing a card detail page THEN the system SHALL display all conversion rates for that card grouped by rate ratio
2. WHEN the admin clicks "Add Conversion Rate" THEN the system SHALL display a form to create a new rate with partner selection
3. WHEN creating a conversion rate THEN the system SHALL require a rate ratio, partner selection, and insight text
4. WHEN entering a rate ratio THEN the system SHALL validate the format matches patterns like "5:4" or "1:1"
5. WHEN saving a conversion rate THEN the system SHALL allow setting annual caps, group classifications, and enabled status

### Requirement 8

**User Story:** As a website administrator, I want to upload and manage program logos, so that the points calculator displays recognizable brand images.

#### Acceptance Criteria

1. WHEN uploading a logo THEN the system SHALL accept common image formats including PNG, JPG, WEBP, and SVG
2. WHEN an image is uploaded THEN the system SHALL validate file size does not exceed 2MB
3. WHEN storing uploaded images THEN the system SHALL save them to the public directory with organized naming
4. WHEN displaying logos in forms THEN the system SHALL show a preview of the current logo image
5. WHEN updating a logo THEN the system SHALL replace the old file and update the database reference

### Requirement 9

**User Story:** As a website user, I want the points calculator to continue working seamlessly, so that I can calculate point transfers without noticing backend changes.

#### Acceptance Criteria

1. WHEN the points calculator page loads THEN the system SHALL fetch conversion data from D1 instead of JSON files
2. WHEN querying conversion data THEN the system SHALL return results in the same format as the previous JSON structure
3. WHEN filtering by program THEN the system SHALL retrieve only enabled programs, cards, and partners
4. WHEN calculating conversions THEN the system SHALL use the same logic and produce identical results as before
5. WHEN the database is unavailable THEN the system SHALL display a user-friendly error message

### Requirement 10

**User Story:** As a website administrator, I want to enable or disable programs, cards, and partners, so that I can control what appears in the points calculator without deleting data.

#### Acceptance Criteria

1. WHEN toggling the enabled status THEN the system SHALL update the database immediately
2. WHEN a program is disabled THEN the system SHALL hide it and all its cards from the points calculator
3. WHEN a card is disabled THEN the system SHALL hide it from the points calculator but keep the program visible
4. WHEN a partner is disabled THEN the system SHALL hide all conversion rates using that partner
5. WHEN viewing the admin UI THEN the system SHALL visually distinguish disabled items from enabled ones

### Requirement 11

**User Story:** As a website administrator, I want to see validation errors clearly, so that I can correct mistakes when entering data.

#### Acceptance Criteria

1. WHEN submitting a form with invalid data THEN the system SHALL display error messages next to the relevant fields
2. WHEN a required field is empty THEN the system SHALL prevent submission and highlight the missing field
3. WHEN entering a duplicate name THEN the system SHALL display an error indicating the name already exists
4. WHEN a server error occurs THEN the system SHALL display a user-friendly message and log technical details
5. WHEN validation passes THEN the system SHALL clear all error messages and proceed with the operation

### Requirement 12

**User Story:** As a developer, I want Cloudflare Workers API routes, so that the admin UI can communicate with the D1 database.

#### Acceptance Criteria

1. WHEN the admin UI makes a request THEN the system SHALL route it through Cloudflare Workers functions
2. WHEN a Worker function executes THEN the system SHALL connect to the D1 database using the bound database instance
3. WHEN querying the database THEN the system SHALL use parameterized queries to prevent SQL injection
4. WHEN an error occurs in a Worker THEN the system SHALL return appropriate HTTP status codes and error messages
5. WHEN handling mutations THEN the system SHALL use transactions to ensure data consistency

### Requirement 13

**User Story:** As a website administrator, I want to search and filter data in the admin UI, so that I can quickly find specific programs, cards, or partners.

#### Acceptance Criteria

1. WHEN the admin types in a search box THEN the system SHALL filter the displayed list in real-time
2. WHEN searching programs THEN the system SHALL match against program names
3. WHEN searching cards THEN the system SHALL match against card names and parent program names
4. WHEN searching partners THEN the system SHALL match against partner names
5. WHEN the search query is cleared THEN the system SHALL display all items again

### Requirement 14

**User Story:** As a website administrator, I want to bulk import data, so that I can quickly add multiple conversion rates at once.

#### Acceptance Criteria

1. WHEN the admin uploads a CSV file THEN the system SHALL parse the file and validate the data format
2. WHEN importing conversion rates THEN the system SHALL match card names and partner names to existing database records
3. WHEN a CSV row contains errors THEN the system SHALL report the specific row and error without stopping the entire import
4. WHEN the import completes THEN the system SHALL display a summary showing successful imports and any errors
5. WHEN duplicate rates exist THEN the system SHALL skip them and report them in the summary

### Requirement 15

**User Story:** As a developer, I want comprehensive error logging, so that I can troubleshoot issues in production.

#### Acceptance Criteria

1. WHEN an error occurs in a Worker function THEN the system SHALL log the error with timestamp and context
2. WHEN a database query fails THEN the system SHALL log the query and error message
3. WHEN authentication fails THEN the system SHALL log the attempt without exposing sensitive information
4. WHEN viewing logs THEN the system SHALL use Cloudflare's logging infrastructure for centralized access
5. WHEN errors are logged THEN the system SHALL include request IDs for tracing related operations
