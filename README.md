# Setel Interview Test

Build a simple order management backend service with Node.js (Nestjs framework) and mongodb. Frontend with React.js client side rendering and Ant Design UI framework.

# Architecture

    Web <----> Orders Api <-----> Payments Api
                    |
                    |
                 MongoDB

# Prerequisite

    - Docker

# Run

    Commands for running the app:

    - docker-compose up -d
        +orders-api (port 3000)
        +payments-api (port 3001)
        +web-ui (port 3002)
        +mongo (port 27017)
