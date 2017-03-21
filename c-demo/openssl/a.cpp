#include <iostream>
#include <string>
#include <openssl/md5.h>

std::string md5(std::string raw)
{
    unsigned char digest[MD5_DIGEST_LENGTH];
    MD5((unsigned char *)(raw.c_str()), raw.length(), (unsigned char *)&digest);
    char result[2 * MD5_DIGEST_LENGTH + 1];
    for (int i = 0; i < MD5_DIGEST_LENGTH; i++)
    {
        sprintf(&result[i * 2], "%02x", (unsigned int)digest[i]);
    }
    return result;
}

int main()
{
    std::cout << md5("happy");
    return 0;
}
