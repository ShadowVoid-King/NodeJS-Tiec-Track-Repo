# import os
# x = int(input("Enter the number of files: "))
# # i want create folders by input each folder name will be Day 1: to number i will set + each folder has index.js

# for i in range(1, x+1):
#     os.system(f"mkdir -p Day {i}")
#     os.system(f"touch Day {i}/index.js")
#     os.system(f"touch Day {i}/task.js")
#     os.system(f"touch Day {i}/Bonus.js")
    # os.system(f"touch Day {i}/test.txt")
    # os.system(f"touch Day {i}/test2.txt")
    # os.system(f"touch Day {i}/test3.txt")
    # os.system(f"touch Day {i}/test4.txt")
    # os.system(f"touch Day {i}/test5.txt")


import os

# Prompt the user for the number of folders to create.
# The int() function converts the input string to a number.
num_folders = int(input("Enter the number of folders to create: "))

# Loop from 1 up to the number the user entered.
for i in range(1, num_folders + 1):
    # Define the name for the main folder
    day_folder = f"Day {i}"

    # --- Create Subfolders ---
    # os.path.join correctly creates the path for any operating system.
    tasks_folder = os.path.join(day_folder, "tasks")
    bonus_folder = os.path.join(day_folder, "bonus")

    # os.makedirs creates all the necessary folders in the path.
    # exist_ok=True prevents an error if the folder already exists.
    os.makedirs(tasks_folder, exist_ok=True)
    os.makedirs(bonus_folder, exist_ok=True)

    # --- Create Files in their respective locations ---
    # A list of file paths to be created
    files_to_create = [
        os.path.join(day_folder, "index.js"),
        os.path.join(day_folder, "test.js"),
        os.path.join(tasks_folder, "task.js"),
        os.path.join(bonus_folder, "bonus.js")
    ]

    # Loop through the list of files and create each one.
    for file_path in files_to_create:
        # Open the file in write mode ('w') and immediately close it.
        # This is a cross-platform way to create an empty file, similar to `touch`.
        open(file_path, 'w').close()

print(f"Successfully created {num_folders} folder(s) with the new structure.")

