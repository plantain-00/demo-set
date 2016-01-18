#include <iostream>
#include <chrono>

using namespace std;

inline const bool IsValid(const int* const queens, const int length)
{
	// the last point
	const auto px = length - 1;
	const auto py = queens[px];

	for (auto i = 0; i < px; i++)
	{
		// |
		if (px == i)
		{
			return false;
		}
		// -
		if (py == queens[i])
		{
			return false;
		}
		const auto deltaX = px - i;
		const auto deltaY = py - queens[i];
		// \ 
		if (deltaX == deltaY)
		{
			return false;
		}
		// /
		if (deltaX + deltaY == 0)
		{
			return false;
		}
	}
	return true;
}

const int Xxx(int result, const int maxDepth, const int depth, int* const queens, const int queensCount)
{
	if (maxDepth == 1)
	{
		return result + 1;
	}
	for (auto i = 0; i < maxDepth; i++)
	{
		queens[queensCount] = i;
		if (depth == 1)
		{
			result = Xxx(result, maxDepth, depth + 1, queens, queensCount + 1);
			continue;
		}
		if (!IsValid(queens, queensCount + 1))
		{
			continue;
		}
		if (depth == maxDepth)
		{
			result++;
		}
		else
		{
			result = Xxx(result, maxDepth, depth + 1, queens, queensCount + 1);
		}
	}
	return result;
}

int main(){
	const auto N = 12;

	auto counts = new int[N];
	auto queens = new int[N];

	auto now = chrono::system_clock::now();

	for (auto i = 0; i < N; i++)
	{
        counts[i] = Xxx(0, i + 1, 1, queens, 0);
	}

	auto duration = chrono::system_clock::now() - now;
	auto milliSeconds = duration.count() / 10000;

	for (auto i = 0; i < N; i++)
	{
		cout << counts[i] << endl;
	}

	delete[] counts;
	delete[] queens;
	
	cout << milliSeconds << endl;//release:0.35-0.38
	char x;
	cin >> x;
}