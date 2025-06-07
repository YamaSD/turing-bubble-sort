def turing_bubble_sort(tape_str):
    tape = list(tape_str)
    head = 0
    steps = []

    isSorted = False
    while not isSorted:
        isSorted = True
        step_snapshot = {'tape': ''.join(tape), 'head': head}
        steps.append(step_snapshot)

        for i in range(len(tape) - 1):
            if tape[i] > tape[i + 1]:
                tape[i], tape[i + 1] = tape[i + 1], tape[i]
                isSorted = False
        head += 1

    steps.append({'tape': ''.join(tape), 'head': head})
    return steps
