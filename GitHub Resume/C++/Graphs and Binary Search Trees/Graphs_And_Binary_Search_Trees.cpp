/* 
Cayleigh Goberman
11/9/2024
CMT 435L, Section 112: Algorithm Analysis and Design
Assignment 3
*/

/* NOTE: There are so many outputs in this file that the console cannot print them all at once.
If you want to comment out some print statements so as to better view others, the printing sections can be found on the following lines:
- Matrices: 319-326
- Adjacency Lists: 386-396
- Linked Objects (already commented out): 485-502
- Linked Objects Depth-First Traversal: 506-514
- Linked Objects Breadth-First Traversal: 531-543
- Binary Search Tree (BST) Insertion: 582-584
- BST In-Order Traversal: 587-588
- BST Lookup and Comparisons: 617-619
- Average BST Lookup Comparisons: 625
*/

// Configuration
#include <iostream>
// Gives us ifstream for reading the text file
#include <fstream>
// Vectors for the adjacency list
#include <vector>
// Queues for the breadth-first traversals
#include <queue>

bool hasVertex0 = false;
// Allows us to tell how many vertices there will be
int size;
// This will act as the string we will detect in various situations
std::string target;
// Keeps track of how many lines have been read so far
int lineNum = 0;
// Allows us to store how long the file is
int fileLength = 0;
// The first vertex when adding edges
std::string firstVertex = "";
// The second vertex when adding edges
std::string secondVertex = "";
// For averaging the lookup comparisons
int BSTLocalNum = 0;
int BSTComparisonNum = 0;

int itemsToFind = 42;

// Linked Object
struct vertex {
    int id;
    bool processed = false;
    vertex* neighbors;
};

// Binary Search Tree
struct BST {
    std::string item;
    BST* left;
    BST* right;
};


void vertexNum (std::ifstream& file){
    // This "for" loop allows us to see how many vertices are in this matrix
    for (int i = lineNum; i < fileLength; i++){
        // Stores the current position before moving on to the next
        std::streampos previousPos = file.tellg();

        std::getline(file, target);
        lineNum++;
                
        if (target.find("add vertex") != std::string::npos) {
            // Only one of the graphs in the example has vertex 0. The rest have start at vertex 1
            // Since matrix indexes start at (0,0), this can cause problems if we assume we start at 1
            if (target[11] == '0'){
                hasVertex0 = true;
            }
            size++;
        } else{
            // If the current position does not have "add vertex", we will revert to the previous line, or oldPos
            file.seekg(previousPos, std::ios::beg);
            lineNum--;
            break;
        }
    }
}

void findVertexOneAndTwo(){
    firstVertex = "";
    secondVertex = "";
    int startReadForSecondVertex = 0;
                
    // "add edge " always indicates when to add an edge
    // Gets firstVertex
    for (int j = 9; j < target.length(); j++){
        if (target[j] != ' '){
            firstVertex = firstVertex + target[j];
        } else{
            // The second vertex is always three spaces away from the first (" - ")
                startReadForSecondVertex = j + 3;
            break;
        }
    }
    //Gets secondVertex
    // We can just go to the end of the target line here
    for (int j = startReadForSecondVertex; j < target.length(); j++){
        secondVertex = secondVertex + target[j];
    }
}

void depthFirstSearch(std::vector<vertex*>& linkedObjects, int v){
    if (linkedObjects[v]->processed == false){
        std::cout << v << " ";
        linkedObjects[v]->processed = true;
    }

    // Creating a new vertex* for reference so that we are not messing with linkedObjects too much
    vertex* pointer = linkedObjects[v];
    int neighborCount = 0;
    while (pointer->neighbors != nullptr){
        neighborCount++;
        pointer = pointer->neighbors;
    }

   pointer = linkedObjects[v];
    for (int i = 0; i < neighborCount; i++) {
        int id = pointer->id;
        if (linkedObjects[id]->processed == false){
            // Recursive function
            depthFirstSearch(linkedObjects, id);
        } 
        else if (pointer->neighbors != nullptr){
            pointer = pointer->neighbors;
        }
    }
}

void breadthFirstSearch(std::vector<vertex*>& linkedObjects, int v){
    // Queue
    std::queue<int> searchQueue;

    // Change vertex->processed to true and enqueue it
    linkedObjects[v]->processed = true;
    searchQueue.push(v);

    // Read through the queue until it is empty
    while(!searchQueue.empty()){
        // Dequeue vertex and print it
        v = searchQueue.front();
        std::cout << v << " ";
        searchQueue.pop();

        vertex* pointer = linkedObjects[v];
        while (pointer != NULL){
            int id = pointer->id;
            if (linkedObjects[id]->processed == false){
                // Recursive function
                linkedObjects[id]->processed = true;
                searchQueue.push(id);
                if (pointer->neighbors == nullptr){
                    break;
                }
            } 
            // Need to add this or it will be caught in a forever loop when it finds a linkedObjects[id]->processed == true
            if (linkedObjects[id]->processed == true){
                pointer = pointer->neighbors;
            }
            else if (pointer->neighbors != nullptr){
                pointer = pointer->neighbors;
            }
        }
    }
}

BST* insertToBST(BST* binarySearchTree, std::string item) {
    // If the tree is empty, add a new node
    if (binarySearchTree == nullptr) {
        BST* newNode = new BST();
        newNode->item = item;
        newNode->left = newNode->right = nullptr;
        return newNode;
    }

    // Otherwise, recur down the tree
    if (item < binarySearchTree->item) {
        std::cout << "L, ";
        binarySearchTree->left = insertToBST(binarySearchTree->left, item);
    }
    else if (item > binarySearchTree->item) {
        std::cout << "R, ";
        binarySearchTree->right = insertToBST(binarySearchTree->right, item);
    }

    return binarySearchTree;
}

void inOrderTraversal(BST* binarySearchTree){
    if (binarySearchTree != nullptr){
        // Use recursive function on the left side of the tree
        inOrderTraversal(binarySearchTree->left);
        // Print the leftmost item
        std::cout << binarySearchTree->item << std::endl;
        // Go to the right of the tree now
        inOrderTraversal(binarySearchTree->right);
    }
}

BST* searchBST (BST* binarySearchTree, std::string item){
    // If binarySearchTree is null (nothing there)
    if (binarySearchTree == nullptr){
        BSTLocalNum++;
        BSTComparisonNum++;
        std::cout << "\nItem not found" << std::endl;
        return binarySearchTree;
    }
    
    // If the item is at binarySearchTree
    if (binarySearchTree->item == item){
        BSTLocalNum++;
        BSTComparisonNum++;
        return binarySearchTree;
    }

    // If the target item is greater than the binarySearchTree's item
    if(binarySearchTree->item < item){
        BSTLocalNum++;
        BSTComparisonNum++;
        std::cout << "R, ";
        return searchBST(binarySearchTree->right, item);
    }

    // Otherwise, the target item is smaller than the binarySearchTree's item
    BSTLocalNum++;
    BSTComparisonNum++;
    std::cout << "L, ";
    return searchBST(binarySearchTree->left, item);
}


int main() {
    // Part 1: Undirected Graphs
    // These ints are just for display purposes when we print the matrices/adjacency lists
    int matrixNum = 1;
    int listNum = 1;
    int linkedObjNum = 1;

    // Allows us to open and read data from the file
    std::ifstream file;
    file.open("graphs1.txt");

    // Failsafe in case the user does not have the file
    if (file.fail()) {
        std::cout << "File failed to open" << std::endl;
        // Returning 1 indicates to the program that something has gone wrong
        return 1;
    }

    // This is more reliable than !file.eof(). As long as there is another line to read, it will continue
    // This retrieves the file's length
    while (std::getline(file, target)) {
        fileLength++;
    }

    // Need to get rid of fail flags before we can go back to the beginning of the file
    file.clear();
    // Moves back to the beginning of the file
    file.seekg(0, std::ios::beg);

    // Matrices
    while (std::getline(file, target)) {
        if (target.find("new graph") != std::string::npos){
            size = 0;

            vertexNum(file);
            if (hasVertex0 == false){
                size++;
            }

            // Creating the matrix
            int matrix[size][size];

            // Initialize all elements of the matrix to 0
            for (int i = 0; i < size; i++) {
                for (int j = 0; j < size; j++) {
                    matrix[i][j] = 0;
                }
            }

            // Adding edges
            for (int i = lineNum; i < fileLength; i++){
                if (!file.eof()){
                    // Stores the current position before moving on to the next
                    std::streampos previousPos = file.tellg();

                    std::getline(file, target);
                    lineNum++;

                    if (target.find("add edge") != std::string::npos){
                        findVertexOneAndTwo();
                        // Since we stored firstVertex and secondVertex as strings, we need to use stoi() to convert them to integers
                        // Mark the edge between firstVertex and secondVertex as 1
                        matrix[std::stoi(firstVertex)][std::stoi(secondVertex)] = 1;
                        // Graph is undirected, so we need to do it for the opposite vertex as well
                        matrix[std::stoi(secondVertex)][std::stoi(firstVertex)] = 1;
                    } else {
                        // If the current position does not have "add vertex", we will revert to the previous line, or oldPos
                        file.seekg(previousPos, std::ios::beg);
                        lineNum--;
                        std::cout << std::endl;
                        break;
                    }
                } else {
                    // Occurs when we reach the end of the file
                    break;
                }
            }

            // Prints the matrix
            std::cout << "Matrix " << matrixNum << std::endl;
            for (int i = 0; i < size; i++) {
                for (int j = 0; j < size; j++) {
                    std::cout << matrix[i][j] << " ";
                }
                std::cout << std::endl;
            }
            std::cout << std::endl;
            

        // End of target.find("new graph")
        matrixNum++;
        }
       lineNum++;
       // End of "while (std::getLine(file, target))"
    }

    file.clear();
    file.seekg(0, std::ios::beg);

    lineNum = 0;
    firstVertex = "";
    secondVertex = "";

    // Adjacency Lists
    while (std::getline(file, target)) {
        hasVertex0 = false;
        if (target.find("new graph") != std::string::npos){
            size = 0;

            vertexNum(file);
            if (hasVertex0 == false){
                size++;
            }

            // Creating the adjacency list
            std::vector<std::vector<int>> adjacencyList(size);

            // Adding edges
            for (int i = lineNum; i < fileLength; i++){
                if (!file.eof()){
                    // Stores the current position before moving on to the next
                    std::streampos previousPos = file.tellg();

                    std::getline(file, target);
                    lineNum++;

                    if (target.find("add edge") != std::string::npos){
                        findVertexOneAndTwo();

                        adjacencyList[std::stoi(firstVertex)].push_back(std::stoi(secondVertex));
                        adjacencyList[std::stoi(secondVertex)].push_back(std::stoi(firstVertex));

                    } else {
                        // If the current position does not have "add vertex", we will revert to the previous line, or oldPos
                        file.seekg(previousPos, std::ios::beg);
                        lineNum--;
                        std::cout << std::endl;
                        break;
                    }
                } else {
                    // Occurs when we reach the end of the file
                    break;
                }
            }

            // Printing the adjacency list
            std::cout << "\nAdjacency List " << listNum << std::endl;
            for (int i = 0; i < adjacencyList.size(); ++i) {
                // Vertex number
                std::cout << i << ") ";
                // Print each adjacent vertex
                for (int j = 0; j < adjacencyList[i].size(); ++j) {
                    std::cout << adjacencyList[i][j] << " -> ";
                }
                // End of the line
                std::cout << "nullptr" << std::endl;
            }

            listNum++;
        }
    }

    file.clear();
    file.seekg(0, std::ios::beg);

    lineNum = 0;
    firstVertex = "";
    secondVertex = "";

    // Linked Objects
    while (std::getline(file, target)) {
        hasVertex0 = false;
        if (target.find("new graph") != std::string::npos){
            size = 0;

            vertexNum(file);
            if (hasVertex0 == false){
                size++;
            }

            std::vector<vertex*> linkedObjects(size);

            // Adding edges
            for (int i = lineNum; i < fileLength; i++){
                if (!file.eof()){
                    // Stores the current position before moving on to the next
                    std::streampos previousPos = file.tellg();

                    std::getline(file, target);
                    lineNum++;

                    if (target.find("add edge") != std::string::npos){
                        findVertexOneAndTwo();

                        // We're going to be typing the numerical value of firstVertex and secondVertex a lot,
                        // So I'm just going to declare them as variables here rather than typing out "std::stoi" each time
                        int vertex1 = std::stoi(firstVertex);
                        int vertex2 = std::stoi(secondVertex);

                        // First vertex
                        vertex* lineToBeAppended = new vertex();
                        lineToBeAppended->id = vertex2;
                        lineToBeAppended->neighbors = nullptr;
                        if (linkedObjects[vertex1] == NULL){
                            linkedObjects[vertex1] = lineToBeAppended;
                        }
                        else {
                            vertex* pointer = linkedObjects[vertex1];
                            while (pointer->neighbors != nullptr){
                                pointer = pointer->neighbors;
                            }
                            pointer->neighbors = lineToBeAppended;
                        }

                        // Second vertex
                        // Making a new vertex* just to be safe
                        vertex* lineToBeAppended2 = new vertex();
                        lineToBeAppended2->id = vertex1;
                        lineToBeAppended2->neighbors = nullptr;
                        if (linkedObjects[vertex2] == NULL){
                            linkedObjects[vertex2] = lineToBeAppended2;
                        }
                        else {
                            vertex* pointer = linkedObjects[vertex2];
                            while (pointer->neighbors != nullptr){
                                pointer = pointer->neighbors;
                            }
                            pointer->neighbors = lineToBeAppended2;
                        }
                        
                    } else {
                        // If the current position does not have "add vertex", we will revert to the previous line, or oldPos
                        file.seekg(previousPos, std::ios::beg);
                        lineNum--;
                        std::cout << std::endl;
                        break;
                    }
                } else {
                    // Occurs when we reach the end of the file
                    break;
                }
            }

            // Printing the graph
            /*std::cout << std::endl;
            for (int i = 0; i < size; i++) {
                std::cout << "linkedObjects[" << i << "] = ";
                // Prints if the index is not empty
                if (linkedObjects[i] != nullptr) {
                    vertex* pointer = linkedObjects[i];
                    while (pointer->neighbors != nullptr){
                        std::cout << "(" << pointer->id << "), ";
                        pointer = pointer->neighbors;
                    } 
                    // Added this for the one instance where pointer->next == nullptr
                    std::cout << "(" << pointer->id << ")" << std::endl;
                } 
                // Prints if the index is not empty
                else {
                    std::cout << "-" << std::endl;
                }
            }*/

           // Depth-First Traversal
           // Loop through all vertices
           std::cout << "Linked Object " << linkedObjNum << ": Depth-First Traversal" << std::endl;
            for (int i = 0; i < size; i++){
                if(linkedObjects[i] != NULL){
                    if (linkedObjects[i]->processed == false){
                        // If vertex i has not been visited,perform depthFirstSearch on it
                        depthFirstSearch(linkedObjects, i);
                    }
                }
            }

            // Resetting "processed" to false for each vertex so we can perform breadth-first search on it
            for (int i = 0; i < size; i++) {
                if(linkedObjects[i] != NULL){
                    if (linkedObjects[i]->processed == true) {
                        linkedObjects[i]->processed = false;
                        //std::cout << "(" << linkedObjects[i]->id << ", " << linkedObjects[i]->processed << ")" << std::endl;
                    }
                }
            }

            std::cout << std::endl;


            // Breadth-First Traversal
           // Loop through all vertices
           std::cout << "Linked Object " << linkedObjNum << ": Breadth-First Traversal" << std::endl;
            for (int i = 0; i < size; i++){
                if(linkedObjects[i] != NULL){
                    if (linkedObjects[i]->processed == false){
                        // If vertex i has not been visited,perform depthFirstSearch on it
                        breadthFirstSearch(linkedObjects, i);
                    }
                }
            }
            std::cout << std::endl;
            if (linkedObjNum == 4){
                std::cout << std::endl;
            }

            linkedObjNum++;
        }
    }

    // Don't forget to close the file when done
    file.close();


    // Part 2: Binary Search Tree
    file.open("magicitems.txt");

    // Failsafe in case the user does not have the file
    if (file.fail()) {
        std::cout << "File failed to open" << std::endl;
        // Returning 1 indicates to the program that something has gone wrong
        return 1;
    }

    // Create binary search tree
    BST* binarySearchTree = new BST();
    binarySearchTree = nullptr;

    std::cout << "Paths: " << std::endl;

    // Inserting Items into the BST
    // Gets the string at the specific line and stores it in "target"
    while (std::getline(file, target)) {

        /* The loop turns all the letters to lowercase. If this is not done, the items with a lowercase first letter 
        will be automatically placed at the end of the tree instead of sorted into their proper alphabetical order. */
        for (int i = 0; i < target.length(); i++) {
            if (target[i] != ' ') {
                // Converts characters to lowercase
                target[i] = tolower(target[i]);
            }
        }

        std::cout << target << ": ";
        binarySearchTree = insertToBST(binarySearchTree, target);
        std::cout << std::endl;
    }

    std::cout << "\nIn-Order Traversal: " << std::endl;
    inOrderTraversal(binarySearchTree);

    // We can close the file now that we are finished with binarySearchTree
    file.close();


    // Searching the BST
    file.open("magicitems-find-in-bst.txt");

    // Failsafe in case the user does not have the file
    if (file.fail()) {
        std::cout << "File failed to open" << std::endl;
        // Returning 1 indicates to the program that something has gone wrong
        return 1;
    }

    std::cout << "\nSearching the Binary Search Tree: " << std::endl;
    while (std::getline(file, target)) {
        // Resets the comparison count for an item to zero every time we start a new search
        BSTLocalNum = 0;

        /* The loop turns all the letters to lowercase. If this is not done, the items with a lowercase first letter 
        will be automatically placed at the end of the tree instead of sorted into their proper alphabetical order. */
        for (int i = 0; i < target.length(); i++) {
            if (target[i] != ' ') {
                // Converts characters to lowercase
                target[i] = tolower(target[i]);
            }
        }

        std::cout << target << ": ";
        searchBST(binarySearchTree, target);
        std::cout << "\nTotal Comparisons: " << BSTLocalNum << std::endl;
    }

    file.close();

    // 42 items to look up, so we can divide our total comparisons by 42 to get the average
    float avgComparisons = BSTComparisonNum / itemsToFind;
    std::cout << "\nOverall Average Comparisons for Binary Search Tree Lookup: " << avgComparisons << std::endl;

    return 0;
}
