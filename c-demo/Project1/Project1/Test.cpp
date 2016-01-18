class Test{
public:
	int add(int x, int y){
		return x + y;
	}
};

extern "C" __declspec(dllexport) int add(int x, int y){
	Test* test = new Test();
	return test->add(x, y);
}