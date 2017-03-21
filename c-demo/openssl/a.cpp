#include <stdio.h>
#include <string>
#include <openssl/md5.h>

int main()
{
    unsigned char digest[MD5_DIGEST_LENGTH];
    std::string raw("happy");
    MD5((unsigned char *)(raw.c_str()), raw.length(), (unsigned char *)&digest);
    char result[33];
    for (int i = 0; i < MD5_DIGEST_LENGTH; i++)
    {
        sprintf(&result[i * 2], "%02x", (unsigned int)digest[i]);
    }
    printf("md5 digest: %s\n", result);
    return 0;
}
