#include "Position.h"
#include "SudokuBoard.h"
#include <iostream>
#include <chrono>

using namespace std;

void main(){
    auto board = SudokuBoard(new int[RANK * RANK]{
        0, 0, 0, 0, 2, 0, 1, 0, 9,
            9, 0, 0, 0, 0, 4, 0, 2, 5,
            0, 0, 2, 0, 0, 0, 3, 0, 0,
            0, 0, 7, 5, 0, 8, 0, 6, 0,
            0, 9, 0, 0, 4, 6, 0, 0, 7,
            0, 6, 0, 0, 0, 0, 0, 3, 0,
            4, 0, 9, 1, 0, 0, 0, 0, 0,
            0, 3, 1, 0, 0, 2, 4, 0, 0,
            2, 0, 0, 0, 0, 0, 0, 0, 3
    });

    board.Print();

    vector<SudokuBoard> result;

    auto now = chrono::system_clock::now();

    board.Do(result);

    auto duration = chrono::system_clock::now() - now;
    auto milliSeconds = duration.count() / 10000;

    for each(auto sudokuBoard in result)
    {
        cout << endl;
        sudokuBoard.Print();
    }

    cout << endl << milliSeconds << endl;
    char x;
    cin >> x;
}