using System;
using System.Runtime.InteropServices;

namespace ConsoleApplication1
{
    internal class Program
    {
        [DllImport("Project1.dll", CallingConvention = CallingConvention.Cdecl)]
        private static extern int add(int x, int y);

        private static void Main(string[] args)
        {
            Console.WriteLine(add(1, 2));
            Console.Read();
        }
    }
}