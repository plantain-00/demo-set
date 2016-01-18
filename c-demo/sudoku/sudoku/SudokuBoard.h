#pragma once

#include "Position.h"
#include <vector>
using namespace std;

const int RANK = 9;

class SudokuBoard
{
    Position** Positions;
    const bool IsValid(const int x, const int y, const int value);

public:
    SudokuBoard(const int* const values)
    {
        Positions = new Position*[RANK];
        for (auto i = 0; i < RANK; i++)
        {
            Positions[i] = new Position[RANK];
            for (auto j = 0; j < RANK; j++)
            {
                Positions[i][j].Value = values[i*RANK + j];
                Positions[i][j].IsFixed = values[i*RANK + j] != 0;
            }
        }
    }
    SudokuBoard(const SudokuBoard& sudokuBoard){
        Positions = new Position*[RANK];
        for (auto i = 0; i < RANK; i++)
        {
            Positions[i] = new Position[RANK];
            for (auto j = 0; j < RANK; j++)
            {
                Positions[i][j].Value = sudokuBoard.Positions[i][j].Value;
                Positions[i][j].IsFixed = sudokuBoard.Positions[i][j].IsFixed;
            }
        }
    }
    ~SudokuBoard(){
        for (int i = 0; i < RANK; i++)
        {
            delete[] Positions[i];
        }
        delete[] Positions;
    }

    void Do(vector<SudokuBoard>& const result, const int x = 0, const int y = 0);
    void Print();
};