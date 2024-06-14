#!/bin/sh
pre_build(){
    echo "Trying to copy domains"
    cp -r $(pwd)/app/backend/app/restaurant/domain $(pwd)/app/frontend/src/apps/restaurant/
}

post_build(){
    echo "Removing domains"
    rm -rf $(pwd)/app/frontend/src/apps/restaurant/domain
}
