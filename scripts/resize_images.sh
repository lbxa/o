#!/bin/bash

# Run: brew install imagemagick

# Check if at least one argument is provided
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <image-file> [<image-file> ...]"
  exit 1
fi

# Function to resize images based on width
resize_image() {
  local input_image=$1
  local base_name=$(basename "$input_image" | cut -d. -f1)
  local ext="${input_image##*.}"

  # Define width resolutions
  local low_res_width="640"
  local med_res_width="1280"
  local high_res_width="1920"

  # Generate images with proportional height
  magick "$input_image" -resize "${low_res_width}x" "${base_name}_low.$ext"
  magick "$input_image" -resize "${med_res_width}x" "${base_name}_med.$ext"
  magick "$input_image" -resize "${high_res_width}x" "${base_name}_high.$ext"
}

# Iterate over all provided image files
for image in "$@"; do
  resize_image "$image"
done

echo "Resizing complete!"