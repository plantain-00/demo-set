#include "Position.h"
#include "SudokuBoard.h"
#include <vector>
#include <iostream>

using namespace std;

const bool SudokuBoard::IsValid(const int x, const int y, const int value)
{
    for (auto i = 0; i < x; i++)
    {
        if (Positions[i][y].Value == value)
        {
            return false;
        }
    }

    for (auto i = x + 1; i < RANK; i++)
    {
        if (Positions[i][y].IsFixed
            && Positions[i][y].Value == value)
        {
            return false;
        }
    }

    for (auto j = 0; j < y; j++)
    {
        if (Positions[x][j].Value == value)
        {
            return false;
        }
    }

    for (auto j = y + 1; j < RANK; j++)
    {
        if (Positions[x][j].IsFixed
            && Positions[x][j].Value == value)
        {
            return false;
        }
    }

    const auto start_x = x / 3 * 3;
    const auto start_y = y / 3 * 3;
    for (auto i = start_x; i < start_x + 3; i++)
    {
        for (auto j = start_y; j < start_y + 3; j++)
        {
            if (j > y
                || (j == y && i > x))
            {
                if (Positions[i][j].IsFixed
                    && Positions[i][j].Value == value)
                {
                    return false;
                }
            }
            else if ((i != x || j != y)
                && Positions[i][j].Value == value)
            {
                return false;
            }
        }
    }
    return true;
}

void SudokuBoard::Do(vector<SudokuBoard>& const result, const int x, const int y)
{
    if (Positions[x][y].IsFixed)
    {
        if (x == RANK - 1
            && y == RANK - 1)
        {
            result.push_back(SudokuBoard(*this));
        }
        else if (x == RANK - 1)
        {
            Do(result, 0, y + 1);
        }
        else
        {
            Do(result, x + 1, y);
        }
    }
    else
    {
        for (auto i = 1; i < RANK + 1; i++)
        {
            if (IsValid(x, y, i))
            {
                Positions[x][y].Value = i;

                if (x == RANK - 1
                    && y == RANK - 1)
                {
                    result.push_back(SudokuBoard(*this));
                }
                else if (x == RANK - 1)
                {
                    Do(result, 0, y + 1);
                }
                else
                {
                    Do(result, x + 1, y);
                }
            }
        }
    }
}
void SudokuBoard::Print(){
    for (auto i = 0; i < RANK; i++)
    {
        for (auto j = 0; j < RANK; j++)
        {
            cout << Positions[i][j].Value;
        }
        cout << endl;
    }
}