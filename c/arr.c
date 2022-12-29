// arr.c  how to use arrays.
#include <stdio.h>

int sumArray(int arr[]);
void mutateArray(char arr[]);
void returnArray(int arr[], int root);

int main(){
    // create array and print.  
    char arr[10];
    int brr[10];
    for(int i=0; i<10; i++){
        arr[i] = i+97;
        printf("%c\n",arr[i]);
    }
   
printf("\nmodify array\n");
// modify specific elements of array.
    arr[1] = '3';
    arr[5] = '2';
    arr[8] = '1';
    for(int i=0; i<10; i++){
        printf("%c\n",arr[i]);
    }
// pass array to function that sums array and returns value.
printf("\nsum array\n");
for(int i=0; i<10; i++){
    brr[i] = i+1;
}
sumArray(brr);
// pass to function that mutates array
printf("attempt to mutate");
printf("Before function call...");
for(int i=0; i<10; i++){
    printf("%c\n",arr[i]);
}
mutateArray(arr);
printf("After function call...");
for(int i=0; i<10; i++){
    printf("%c\n",arr[i]);
}
// pass int to function and have it return a sequence of numbers in an array.
// printf("Return array...should be 0,2,4,6\n");

int ar[4];
for(int i = 0; i<4; i++){
        ar[i] = 0;
        printf("%d\n", ar[i]);
    } 
returnArray(ar, 2);

for(int i = 0; i< 4; i++){
    printf("%d\n", ar[i]);
}


return 0;
}

int sumArray(int arr[]){
    int count=0;
    for(int i=0; i<10; i++){
        count += arr[i];
    }   
    printf("Count is: %d\n", count);
 
    return count;
}

// changes array
void mutateArray(char arr[]){
    for(int i=0; i<10; i++){
        arr[i] = arr[i] +2;
    }
}

// Does not return array, modifies array and doesn't need to return in.
// Blank array passed in, then its filled. 
// Can I just create an array and return a pointer to its head?d
void returnArray(int arr[], int root){
    for(int i = 0; i<4; i++){
        arr[i] = root * i;
    } 
}
