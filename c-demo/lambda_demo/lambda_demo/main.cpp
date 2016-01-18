#include <iostream>
#include <functional>

using namespace std;

function<int(int)> add(function<int(int)> f1, function<int(int)> f2){
    return [f1, f2](int x){
        return f1(x) + f2(x);
    };
}

void main(){
    auto f = add([](int x){
        return x * x;
    }, [](int x){
        return x * 2 + 1;
    });
    cout << f(2) << endl;
    char c;
    cin >> c;
}