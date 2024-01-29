<p align="center">
  <img src="https://github.com/jp34/comedypull/assets/33505893/e1a7a5f5-65aa-49b8-a647-48ddd05c64e2">
</p>

<div align="center">
  
## Stay up to date with your favorite comedians, and never miss a show

</div>

A website showcasing the top 100 most popular comedians and their shows across the country. Allowing comedy fans to stay up to date with the comedians they love, and discover new favorites. Users will be able to discover new comedians, find local shows, and receive notifications about upcoming shows, ticket sales, and curated recommendations.

Powered by Ticketmaster, this application uses the [Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) to maintain a dataset of thousands of comedy shows. 

## Planned Features:

* Gallery of shows, comedians, and venues. Both local and national
* Receive notifications of upcoming shows, or new shows from followed comedians
* Daily updates of show details
* Link's to purchase tickets from Ticketmaster

## Recent Changes:

**January 2024:**
> * Implemented repository layer to support complex MongoDB queries
> * Redesigned DTO & response objects to reflect consumption requirements of frontend
> * Began overhaul of React frontend (Made gallery components more dynamic to increase utilization and reduce overall number of components)

**December 2023:**
> * Improved update engine algorithm (Added support for query retries, versioning for database updates, and Ticketmaster API request rate limiting)
> * Added geographical based querying for shows & venues
