# Very useful script for quickly debugging graphql server
# global ids are encoded as base64(type:id)
# Usage: ./global_encode.sh User 29
# Outputs: LW4gVXNlcjoyOQo=
echo "$(echo -n "$1:$2" | openssl base64 | tr -d '\n')" | tee /dev/tty | pbcopy
echo "Copied to clipboard!"
