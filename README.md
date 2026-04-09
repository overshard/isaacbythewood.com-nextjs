<p align="center">
    <img src="https://raw.githubusercontent.com/overshard/isaacbythewood.com/master/public/static/images/favicon.png"
         width="200"
         height="200"
         alt="isaacbythewood.com Favicon" />
</p>

# Isaac Bythewood

The personal website of Isaac Bythewood, a Senior Solutions Architect located in
Elkin, NC.

https://isaacbythewood.com/

## Clone

For any possible way of running this website yourself you'll need a copy of the
repo:

    git clone https://github.com/overshard/isaacbythewood.com.git

After you get the repo it's up to you how you want to use it.

## Development

You will need to have [bun](https://bun.sh/) installed. After that you can run:

    bun install
    bun start

This will spin up isaacbythewood.com to run on port 8000 which you can access
via a browser at `http://localhost:8000`.

## Production

The project includes a `Dockerfile` and `docker-compose.yml` for production
deployment. To build and run with Docker:

    docker compose up -d
