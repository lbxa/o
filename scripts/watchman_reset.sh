#!/bin/bash

# run this at the monorepo root
# watchman shutdown-server
watchman watch-del $(pwd)
watchman watch-project $(pwd)
watchman