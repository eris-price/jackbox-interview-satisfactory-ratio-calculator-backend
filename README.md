#Satisfactory Ratio Calculator Backend

This node/nestjs app provides a backend for [Satisfactory Ratio Calculator](https://github.com/eris-price/jackbox-interview-satisfactory-ratio-calculator-frontend)

###Running locally

This api can be run locally with `yarn start` and hit at localhost:3000/craftableItems

###API Description

The ratio calculator provides two endpoints. 
The first is GET `/craftableItems`, this provides a list of all items for which a recipe can be calculated, and is used to populate the dropdown on the frontend.
The second is GET `/craftableItems/calculateRatios`, which takes two query params, craftableItemId which is dervied from the response of the first endpoint, and the second is the itemsPerMinuteTarget, a number that is exactly what it sounds like. This endpoint returns a list items, and the required items per minute for each to hit the target items per minute for the initial item.

###Other Information
This was built using nestjs, which tbh is probably overkill for a simple 2 endpoint backend like this, but its very very easy to bootstrap a new server application using nest, and it pulls in all the necessary build tools and configs so it's great when you want something quick.
