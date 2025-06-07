from bubble_sort import turing_bubble_sort

if __name__ == "__main__":
    tape_input = input("Enter tape (e.g., 1110001): ")
    steps = turing_bubble_sort(tape_input)

    print("\n--- Simulation Steps ---")
    for i, step in enumerate(steps):
        print(f"Step {i}: Tape = {step['tape']}, Head at = {step['head']}")
