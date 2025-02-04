/* 
Cayleigh Goberman
9/16/2024
*/

// Configuration
#include <iostream>
// Gives us ifstream for reading the text file
#include <fstream>
using namespace std;

// Setup for the stack and queue
// Defines how many characters are allowed in the stack or queue at a time
#define stackAndQueueSize 100
string stack[stackAndQueueSize];
int stackTop = -1;

string queue[stackAndQueueSize];
int queueFront = -1;
int queueBack = -1;
int mergeComparisons = 0;
int quicksortComparisons = 0;

// Stack
// Sets up isEmpty so we can detect when the stack is, well, empty.
bool stackIsEmpty() {
    if (stackTop == -1) {
        return true;
    }
    else {
        return false;
    }
}

// Sets up the ability to push values
// Is set to "void" so we do not have to return a value
void push(string character) {
    if (stackTop == stackAndQueueSize - 1) {
        cout << "Stack is full!" << endl;
    }
    else {
        stackTop++;
        stack[stackTop] = character;
    }
}

// Sets up the ability to pop values
void pop() {
    // Checks if the stack is empty so that we do not try to pop a nonexistent value
    if (stackIsEmpty() == true) {
        cout << "Stack is empty!" << endl;
    }
    else {
        stackTop--;
    }
}

// Queue
// Sets up isEmpty so we can detect when the queue is empty.
bool queueisEmpty() {
    if (queueFront == -1 && queueBack == -1) {
        return true;
    }
    else {
        return false;
    }
}

// Sets up the ability to enqueue values
void enqueue(string character) {
    // Detects if the queue is full and gives us a warning
    if (queueBack == stackAndQueueSize - 1) {
        cout << "Queue is full!" << endl;
    }
    else {
        // Insert first item
        if (queueFront == -1) {
            queueFront = 0;
        }
        queueBack++;
        // Insert at back of queue
        queue[queueBack] = character;
    }
}

// Sets up the ability to dequeue values
void dequeue() {
    // Detects if the queue is empty and gives us a warning
    if (queueBack == stackAndQueueSize - 1) {
        cout << "Queue is empty!" << endl;
    }
    else {
        // Occurs if we remove the last item in the queue
        // Resets queue back to beginning state
        if (queueFront == queueBack) {
            queueFront = -1;
            queueBack = -1;
        }
        else {
            queueFront++;
        }
    }
}

// Shuffle: Has to be based on the O(n) Knuth (Fisher-Yates) Shuffle
// This shuffle starts from the last object in the array and swaps it with another random object
// We need srand(time(NULL)) to get a different random seed value so that we do not get the same "random" shuffle each time we run the program. 
// It uses the internal clock (time(NULL)) to make a random seed (srand()).
void shuffle(string magicItemsArray[], int size) {
    srand (time(NULL));
    for (int i = size - 1; i > 0; i--) {
        // Selects a random object from 0 to i
        int randObj = rand() % (i + 1);
        // Swaps magicItemsArray[i] with randObj
        string hold = magicItemsArray[i];
        magicItemsArray[i] = magicItemsArray[randObj];
        magicItemsArray[randObj] = hold;
    }
}

void selectionSort(string magicItemsArray[], int size) {
    int selectionComparisons = 0;
    for (int i = 0; i < size; i++){
        for (int j = i + 1; j < size; j++) {
            selectionComparisons += 1;
            if (magicItemsArray[i] > magicItemsArray[j]) {
                string min = magicItemsArray[i];
                magicItemsArray[i] = magicItemsArray[j];
                magicItemsArray[j] = min;
            }
        }
    }
    cout << "\nTotal Comparisons for Selection Sort: " << selectionComparisons << endl;
}

void insertionSort(string magicItemsArray[], int size) {
    int insertionComparisons = 0;
    for (int i = 0; i < size; i++){
        string item = magicItemsArray[i];
        int j = i - 1;
        // Detects the object before "item". If it is greater than "item", then it is moved to be behind "item".
        // Moves all items greater than "item" to one position ahead of their current one
        while (j >= 0 && magicItemsArray[j] > item) {
            insertionComparisons += 1;
            magicItemsArray[j + 1] = magicItemsArray[j];
            j -= 1;
        }
        magicItemsArray[j + 1] = item;
    }
    cout << "Total Comparisons for Insertion Sort: " << insertionComparisons << endl;
}

void merge(string magicItemsArray[], int left, int middle, int right) {
    // Length of the left subarray
    int nL = middle - left + 1;
    // Length of the right subarray
    int nR = right - middle;

    // Create temporary subarrays for the left and right
    string L[nL];
    string R[nR];

    // Copy the items from the left and right sides of magicItemsArray into their respective subarray
    for (int i = 0; i < nL; i++){
        L[i] = magicItemsArray[left + i];
    }
    for (int i = 0; i < nR; i++){
        R[i] = magicItemsArray[middle + i + 1];
    }

    // i and j will represent the smallest remaining element in L and R, respectively
    int i = 0;
    int j = 0;
    // k represents the location in magicItemsArray that needs to be filled
    int k = left;

    // As long as L and R have an unmerged element, copy the smallest unmerged element back into magicItemsArray
    while (i < nL && j < nR) {
        if (L[i] <= R[j]) {
            magicItemsArray[k] = L[i];
            i++;
        }
        else {
            magicItemsArray[k] = R[j];
            j++;
        }
        k++;
        mergeComparisons += 1;
    }

    // At this point, all of L or R should have been sorted
    // Now we can copy the remaining items into magicItemsArray
    while (i < nL) {
        magicItemsArray[k] = L[i];
        i++;
        k++;
        mergeComparisons += 1;
    }
    while (j < nR) {
        magicItemsArray[k] = R[j];
        j++;
        k++;
        mergeComparisons += 1;
    }
}

// Sorts the elements of the subarrays in merge()
void mergeSort(string magicItemsArray[], int left, int right) {
    // Failsafe in case there is only zero or one element in the array
    if (left >= right) {
        return;
    }

    int middle = (left + right) / 2;
    // Recursively sort L
    mergeSort(magicItemsArray, left, middle);
    // Recursively sort R
    mergeSort(magicItemsArray, middle + 1, right);
    merge(magicItemsArray, left, middle, right);
}

// Since "pivot" is an int, this function needs to return int as well
int partition (string magicItemsArray[], int left, int right) {
    // Selecting the pivot, which will be the last item
    string pivot = magicItemsArray[right];

    // Item just before the final item (used for swapping)
    int i = (left - 1);
    for (int j = left; j < right; j++) {
        quicksortComparisons += 1;
        // If the current item is less than or equal to pivot
        if(magicItemsArray[j] <= pivot) {
            i++;
            // Found this function that will automatically swap the two items
            swap(magicItemsArray[i], magicItemsArray[j]);
        }
    }
    // Pivot goes to the right of the low side
    swap(magicItemsArray[i + 1], magicItemsArray[right]);

    // Return the new index of pivot
    return (i + 1);
}

void quicksort(string magicItemsArray[], int left, int right) {
    // Will continue until the starting "left" item is less than the "right" item
    if (left < right) {
        // Partition subarray around the pivot, which is in magicItemsArray[pivot]
        int p = partition(magicItemsArray, left, right);

        // Sorts the items before and after pivot
        quicksort(magicItemsArray, left, p - 1);
        quicksort(magicItemsArray, p + 1, right);
    }
}

// Any lines of code in main() will be executed automatically once the program is run.
int main() {
    // Array 
    // Allows us to open and read data from the file into the array 
    ifstream file;
    // If we want to add more items to the array, we can modify its length in this single line
    const int size = 666;
    string magicItemsArray[size];
    file.open("magicItems.txt");

    // Failsafe in case the user does not have the file
    if (file.fail()) {
        cout << "File failed to open" << endl;
        // Returning 1 indicates to the program that something has gone wrong
        return 1;
    }

    // Keeps track of how many lines have been read from magicItems so far
    int lines = 0;

    // eof() is part of ifstream. It will return "true" once we reach the end of the file
    // As such, as long as eof() = false, we will continue to add to the array
    while(!file.eof()) {
        // getline() reads the next line from magicitems
        // It will then store that line in magicItemsArray at index "lines"
        getline(file, magicItemsArray[lines]);
        lines += 1;

        // Failsafe for if we accidentally reach the end of the array before we have added all the items from the text file
        if (lines == size) {
            //cout << "The array is full! There is no more storage space." << endl;
            // End the loop
            break;
        }
    }

    // Don't forget to close the file when done
    file.close();

    // Leaving this outside the loop, otherwise it will print more than once
    cout << "The following items from the list are palindromes: " << endl;

    // The loop is set to the current size of magicItemsArray
    for (int i = 0; i < size; i++) {
        string poppedStack = "";
        string dequeuedQueue = "";
        // Need to declare the sizes as separate variables.
        // Otherwise, the size will change as we pop the stack and queue, and we will miss characters
        int stackSize = 0;
        int queueSize = 0;
        // This is so we can save the current item as it is (without changing the spaces and capitalizations)
        // This way, if it is a palindrome, we can print it as it originally appeared
        string currentItem = magicItemsArray[i];

        // Adding the characters to the stack
        for (int j = 0; j < magicItemsArray[i].length(); j++) {
            //Will only add to the stack if the character is not a space
            if (magicItemsArray[i][j] != ' ') {
                // Converts characters to lowercase
                magicItemsArray[i][j] = tolower(magicItemsArray[i][j]);
                // Pushes and enqueues the single letter at j to the stack and queue, respectively
                push(magicItemsArray[i].substr(j, 1));
                enqueue(magicItemsArray[i].substr(j, 1));
                stackSize += 1;
                queueSize += 1;
            }
        }

        // Popping the stack and storing the result as "poppedStack."
        for (int j = 0; j < stackSize; j++) {
            poppedStack += stack[stackTop];
            pop();
        }
        // Dequeuing the queue and storing the result as "dequeuedQueue."
        for (int j = 0; j < queueSize; j++) {
            dequeuedQueue += queue[queueFront];
            dequeue();
        }

        // If poppedStack and dequeuedQueue are equal, then the string is a palindrome and is thus printed
        if (poppedStack == dequeuedQueue) {
            cout << currentItem << endl;
        }
    }


    // Sorting

    // Initial Shuffle
    shuffle(magicItemsArray, size);

    // Selection Sort
    selectionSort(magicItemsArray, size);

    // Shuffle for Insertion Sort
    shuffle(magicItemsArray, size);

    // Insertion Sort
    insertionSort(magicItemsArray, size);

    // Shuffle for Merge Sort
    shuffle(magicItemsArray, size);

    // Merge Sort
    mergeSort(magicItemsArray, 0, size - 1);

    // Shuffle for Quicksort
    shuffle(magicItemsArray, size);

    // Quicksort
    quicksort(magicItemsArray, 0, size - 1);

    // For checking that the array is alphabetized:
    /* for (int i = 0; i < size; i++) 
        cout << magicItemsArray[i] << endl; */

    cout << "Total Comparisons for Merge Sort: " << mergeComparisons << endl;
    cout << "Total Comparisons for Quicksort: " << quicksortComparisons << endl;

    // Informs us that the function executed successfully
    return 0;
}
