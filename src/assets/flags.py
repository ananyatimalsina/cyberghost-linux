import os

# Directory containing the flag images
dir_path = './flags'

# Output file
output_file = './FlagDisplay.tsx'

# Get all .png files in the directory
flag_files = [f for f in os.listdir(dir_path) if f.endswith('.png')]

# Start of the output file
output = '''import React from 'react';\n\n'''

# Add an import statement for each flag
for flag_file in flag_files:
    flag_name = os.path.splitext(flag_file)[0]  # Remove the .png extension
    output += f"import flag{flag_name} from './flags/{flag_file}';\n"

output += '\nconst flags = {\n'

# Add each flag to the flags object
for flag_file in flag_files:
    flag_name = os.path.splitext(flag_file)[0]  # Remove the .png extension
    output += f"  {flag_name}: flag{flag_name},\n"

output += '};\n\n'

# Add the FlagDisplay component
output += '''function FlagDisplay({ selectedFlag }) {
  const flag = flags[selectedFlag];

  return <img src={flag} alt={selectedFlag} />;
}

export default FlagDisplay;\n'''

# Write the output to the file
with open(output_file, 'w') as f:
    f.write(output)