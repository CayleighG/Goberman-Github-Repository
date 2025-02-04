/* 
Cayleigh Goberman
10/13/2024
CMT 435L, Section 112: Algorithm Analysis and Design
Assignment 2
*/

// Configuration
#include <iostream>
// Gives us ifstream for reading the text file
#include <fstream>
// Allows us to reliably round to two decimal places
#include <iomanip>
// Vectors
#include <vector>

int hashCode = 0;

// Need to be doubles, not ints, so we can get to two decimal places
double linearSearchComparisons = 0;
double binarySearchComparisons = 0;
double hashSearchComparisons = 0;

// Chose to use Merge Sort as it had one of the smallest comparison counts and handles "few unique items" better than Quicksort
// in the event that the list is already nearly sorted

void merge(std::string magicItemsArray[], int left, int middle, int right) {
    // Length of the left subarray
    int nL = middle - left + 1;
    // Length of the right subarray
    int nR = right - middle;

    // Create temporary subarrays for the left and right
    std::string L[nL];
    std::string R[nR];

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
    }

    // At this point, all of L or R should have been sorted
    // Now we can copy the remaining items into magicItemsArray
    while (i < nL) {
        magicItemsArray[k] = L[i];
        i++;
        k++;
    }
    while (j < nR) {
        magicItemsArray[k] = R[j];
        j++;
        k++;
    }
}

// Sorts the elements of the subarrays in merge()
void mergeSort(std::string magicItemsArray[], int left, int right) {
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

// Selecting 42 Random Items
void randomItems(std::string selectedItemsArray[], std::string magicItemsArray[], int size){
    int usedNumCount = 0;

    int selectedNumbersArray[42];

    // Gives us a random seed as calculated using the internal clock
    // This ensures that we get different random numbers every time the program is run
    srand (time(NULL));

    for (int i = 0; i < 42; i++){
        // We want 0 to be our minimum possible number (for position 0 in magicItemsArray) and we want size, or 666, to be our maximum
        // As such, our equation should be 0 + rand() % (size), or rand() % (size)
        int randomNum = rand() % (size);
        bool unusedNum = true;

        // Failsafe to check if the same number is selected twice
        for (int j = 0; j < 42; j++){
            if (selectedNumbersArray[j] == randomNum) {
                //The position has already been used
                unusedNum = false;
                // We subtract 1 from i. If we do not, the loop continues even though this spot has not been filled, 
                // resulting in empty indexes at the end.
                i--;
            }
        }

        if (unusedNum == true) {
            selectedNumbersArray[usedNumCount] = randomNum;
            usedNumCount++;
            selectedItemsArray[i] = magicItemsArray[randomNum];
        }
    }
}

// Linear Search function
void linearSearch(std::string magicItemsArray[], std::string key, int size){
    int comparisonsForThisKey = 0;

    for (int i = 0; i < size; i++){
        linearSearchComparisons++;
        comparisonsForThisKey++;
        if (magicItemsArray[i] == key){
            //key has been found
            break;
        }
    }
    std::cout << "Total comparisons while searching for'" << key << "': " << comparisonsForThisKey << std::endl;
}

// Binary Search function
void binarySearch(std::string key, std::string magicItemsArray[], int start, int end){
    int low = start;
    int high = std::max(start, end - 1);
    int comparisonsForThisKey = 0;

    while (low < high) {
        int mid = (low + high) / 2;
        comparisonsForThisKey++;
        binarySearchComparisons++;

        // If key is equal to mid
        if (magicItemsArray[mid] == key){
            break;
        }
        
        // If key is smaller, ignore right half
        if (key <= magicItemsArray[mid]){
            high = mid;
        }

        // If key is greater, ignore left half
        if (magicItemsArray[mid] < key){
            low = mid + 1;
        }
    }
    std::cout << "Total comparisons while searching for'" << key << "': " << comparisonsForThisKey << std::endl;
}

// Creating the hash table
int makeHashCode (std::string magicItem, int hashTableSize){
    int length = magicItem.size();
    int letterNum = 0;
    // Turning all letters in magicItem to uppercase
    for (int i = 0; i < length; i++){
        if (magicItem[i] != ' '){
            magicItem[i] = toupper(magicItem[i]);
        }
    }

    // Iterate over all letters in the string, thus totalling their ASCII values
    for (int i = 0; i < length; i++){
        if (magicItem[i] != ' '){ 
            char letter = magicItem[i];
            // Converts the character into its ASCII value
            int value = static_cast<int>(letter);
            letterNum = letterNum + value;
        }
    }

    // Scale letterNum to fit in hashTableSize
    int hashCode = letterNum % hashTableSize; 

    return hashCode;
}

int main(){
    // Array 
    // Allows us to open and read data from the file into the array 
    std::ifstream file;
    // If we want to add more items to the array, we can modify its length in this single line
    const int size = 666;
    std::string magicItemsArray[size];
    file.open("magicItems.txt");

    // Failsafe in case the user does not have the file
    if (file.fail()) {
        std::cout << "File failed to open" << std::endl;
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
            //std::cout << "The array is full! There is no more storage space." << std::endl;
            // End the loop
            break;
        }
    }

    // Don't forget to close the file when done
    file.close();


    /* The loop is set to the current size of magicItemsArray. It turns all the letters to lowercase.
       If this is not done, the items with a lowercase first letter will be placed at the end of the list
       instead of sorted into their proper alphabetical order. */
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < magicItemsArray[i].length(); j++) {
            if (magicItemsArray[i][j] != ' ') {
                // Converts characters to lowercase
                magicItemsArray[i][j] = tolower(magicItemsArray[i][j]);
            }
        }
    }

    // Merge Sort
    mergeSort(magicItemsArray, 0, size - 1);

    // Selecting 42 Random Items
    std::string selectedItemsArray[42];
    randomItems(selectedItemsArray, magicItemsArray, size);

    // Linear Search
    std::cout << "\nLinear Search:" << std::endl;
    for (int i = 0; i < 42; i++) {
        std::string key = selectedItemsArray[i];
        linearSearch(magicItemsArray, key, size);
    }

    // Binary Search
    std::cout << "\nBinary Search:" << std::endl;
    for (int i = 0; i < 42; i++) {
        std::string key = selectedItemsArray[i];
        binarySearch(key, magicItemsArray, 0, size);
    }

    
    // Hashing
    struct listNode {
        std::string item;
        listNode* next;
    };
    std::vector<listNode*> hashTable(250);

    int hashTableSize = 250;
    int hashValues[size];

    // Reading hash values into hashTable
    for (int i = 0; i < size; i++) {
        hashCode = makeHashCode(magicItemsArray[i], hashTableSize);
        // Formats the output. 03d indicates zero padding, minimum of three digits of width of the output,
        // and that the argument is an integer (d for decimal)
        //std::cout << "hashCode: ";
        //printf("%03d\n", hashCode);
    
        // Make a new list node for this magic item.
        listNode* lineToBeAppended = new listNode();
        lineToBeAppended->item = magicItemsArray[i];
        lineToBeAppended->next = nullptr;
        if (hashTable[hashCode] == NULL){
            hashTable[hashCode] = lineToBeAppended;
        }
        else {
            listNode* pointer = hashTable[hashCode];
            while (pointer->next != nullptr){
                pointer = pointer->next;
            }
            pointer->next = lineToBeAppended;
        }
    } 

    // Print the Hash Table
   /*for (int i = 0; i < hashTableSize; i++) {
      std::cout << "hashTable[" << i << "] = ";
      // Prints if the index is not empty
      if (hashTable[i] != nullptr) {
        listNode* pointer = hashTable[i];
        while (pointer->next != nullptr){
            std::cout << "(" << pointer->item << "), ";
            pointer = pointer->next;
        } 
        // Added this for the one instance where pointer->next == nullptr
        std::cout << "(" << pointer->item << ")" << std::endl;
      } 
      // Prints if the index is not empty
      else {
         std::cout << "-" << std::endl;
      }
   }*/

   // Hash Search
   std::cout << "\nSearching the Hash Table" << std::endl;
    for (int i = 0; i < 42; i++){
        int localComparisons = 0;
        std::string itemName = selectedItemsArray[i];
        hashCode = makeHashCode(selectedItemsArray[i], hashTableSize);

        listNode* pointer = hashTable[hashCode];
        hashSearchComparisons++;
        localComparisons++;
        while (pointer->item != itemName){
            hashSearchComparisons++;
            localComparisons++;
            pointer = pointer->next;
            if (pointer->next == nullptr && pointer->item != itemName) {
                std::cout << itemName << " not found" << std::endl;
                break;
            }
        }
        if (pointer->item == itemName){
            hashSearchComparisons++;
            localComparisons++;
            // Funny little if/else statement because I like proper grammer :)
            if (localComparisons <= 1){
                std::cout << i + 1 << ". '" << itemName << "' found at hashTable[" << hashCode << "]" << " in " << localComparisons << " comparison" << std::endl;
            } else {
                std::cout << i + 1 << ". '" << itemName << "' found at hashTable[" << hashCode << "]" << " in " << localComparisons << " comparisons" << std::endl;
            }
        }
    }

    // Calculating Averages
    // Calculating the Average Number of Comparisons for Linear Search
    double avgLinear = linearSearchComparisons / 42;
    // "fixed" ensures that the decimal point is always positioned in the same place
    // "showpoint" allows us to always display the decimal point, even when all decimal values are 0
    // "setprecision(2)" ensures that only two decimal places are shown
    std::cout << "\nAverage Comparisons in Linear Search: " << std::fixed << std::showpoint << std::setprecision(2) << avgLinear << std::endl;
    
    // Calculating the Average Number of Comparisons for Linear Search
    float avgBinary = binarySearchComparisons / 42;
    std::cout << "Average Comparisons in Binary Search: " << std::fixed << std::showpoint << std::setprecision(2) << avgBinary << std::endl;

    // Calculating the Average Number of Comparisons for Searching the Hash Table
    float avgHash = hashSearchComparisons / 42;
    std::cout << "Average Comparisons When Searching the Hash Table: " << std::fixed << std::showpoint << std::setprecision(2) << avgHash << std::endl;

    return 0;
}
