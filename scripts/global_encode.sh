#!/bin/bash

# Very useful script for quickly debugging graphql server
# global ids are encoded as base64(type:id)
# Usage: ./global_encode.sh User 29
# Outputs: LW4gVXNlcjoyOQo=

# Check for openssl
if ! command -v openssl &> /dev/null; then
    echo "Error: openssl is not installed"
    echo "Please install openssl to use this script"
    exit 1
fi

# Check for pbcopy (macOS)
if ! command -v pbcopy &> /dev/null; then
    echo "Error: pbcopy is not installed"
    echo "This script requires pbcopy (macOS) for clipboard functionality"
    echo "For Linux, modify script to use xclip instead"
    exit 1
fi

# Check if arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <type> <id>"
    exit 1
fi

echo "$(echo "$1:$2" | openssl base64 | tr -d '\n')" | tee /dev/tty | pbcopy
echo "Copied to clipboard!"