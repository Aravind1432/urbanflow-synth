#!/usr/bin/env python3
import shutil
import os

clean_file = r'c:\Users\aravi\Desktop\OpenMAIC\app\generation-preview\page.clean.tsx'
target_file = r'c:\Users\aravi\Desktop\OpenMAIC\app\generation-preview\page.tsx'

try:
    # Copy clean file to target
    shutil.copy2(clean_file, target_file)
    print('✓ Successfully copied page.clean.tsx to page.tsx')
    
    # Remove the clean file
    os.remove(clean_file)
    print('✓ Successfully removed page.clean.tsx')
    
    # Verify the file exists
    if os.path.exists(target_file):
        size = os.path.getsize(target_file)
        print(f'✓ Final file size: {size} bytes')
        print('\n✅ File replacement completed successfully!')
    else:
        print('❌ Error: Target file was not created')
except Exception as err:
    print(f'❌ Error: {err}')
    exit(1)
