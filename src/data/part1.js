// Arrays + Strings + Number problems
export const part1 = [
  // ===== ARRAYS =====
  {
    id: 1, title: 'Second Largest in Array', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Traversal'],
    description: 'Write a program to find the second largest number in an array of integers.',
    examples: [
      { input: 'arr = {12,35,1,10,34,1}', output: '34' },
      { input: 'arr = {5,4,3,2,1}', output: '4' },
      { input: 'arr = {1,2}', output: '1' },
      { input: 'arr = {10,10,9}', output: '9' },
      { input: 'arr = {-1,-2,-3}', output: '-2' },
      { input: 'arr = {100, 100}', output: '100' },
      { input: 'arr = {5, 1, 1, 1}', output: '1' }
    ],
    constraints: 'Array has at least 2 elements.',
    hints: ['Track both largest and second largest as you iterate.', 'When you find a new largest, the old largest becomes second largest.', 'Handle edge case: if all elements are the same, second largest is that element.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {12, 35, 1, 10, 34, 1};\n        int largest = arr[0], secondLargest = Integer.MIN_VALUE;\n        for (int i = 1; i < arr.length; i++) {\n            // Your code here: update largest and secondLargest\n        }\n        System.out.println(secondLargest);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {12, 35, 1, 10, 34, 1};\n        int largest = arr[0], secondLargest = Integer.MIN_VALUE;\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > largest) {\n                secondLargest = largest;\n                largest = arr[i];\n            } else if (arr[i] > secondLargest && arr[i] != largest) {\n                secondLargest = arr[i];\n            }\n        }\n        if (secondLargest == Integer.MIN_VALUE) secondLargest = largest;\n        System.out.println(secondLargest);\n    }\n}'
  },
  {
    id: 2, title: 'Q2: Reverse Array In-Place', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Two Pointers'],
    description: 'Write a program to reverse an array in-place without using extra space.',
    examples: [
      { input: 'arr = {1, 2, 3, 4}', output: '[4, 3, 2, 1]' },
      { input: 'arr = {5}', output: '[5]' },
      { input: 'arr = {1, 2}', output: '[2, 1]' },
      { input: 'arr = {10, 20, 30, 40, 50}', output: '[50, 40, 30, 20, 10]' },
      { input: 'arr = {-1, -2, -3}', output: '[-3, -2, -1]' }
    ],
    hints: ['Use two pointers — one at start, one at end.', 'Swap and move inward.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 30, 40, 50};\n        // Your code here\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 30, 40, 50};\n        int start = 0, end = arr.length - 1;\n        while (start < end) {\n            int temp = arr[start]; arr[start] = arr[end]; arr[end] = temp;\n            start++; end--;\n        }\n        System.out.println("Reversed: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 3, title: 'Find Duplicate Values', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Nested Loop'],
    description: 'Write a program to find the duplicate values in an array of integer values.',
    examples: [
      { input: 'arr = {1,2,2,3,3}', output: '2\n3' },
      { input: 'arr = {1,1,1}', output: '1' },
      { input: 'arr = {1,2,3}', output: '' },
      { input: 'arr = {5,5}', output: '5' },
      { input: 'arr = {10,20,20,30,30,30}', output: '20\n30' },
      { input: 'arr = {-1,-1,0,0}', output: '-1\n0' }
    ],
    hints: ['Use nested loops: compare each element with all following elements.', 'Skip elements you have already reported as duplicates to avoid printing them twice.', 'Check backward to see if current element was already found earlier.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 20, 30, 30, 30, 40, 50, 50};\n        // Your code here - find and print each duplicate only once\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 20, 30, 30, 30, 40, 50, 50};\n        for (int i = 0; i < arr.length; i++) {\n            boolean alreadySeen = false;\n            for (int k = 0; k < i; k++) {\n                if (arr[k] == arr[i]) { alreadySeen = true; break; }\n            }\n            if (alreadySeen) continue;\n            for (int j = i + 1; j < arr.length; j++) {\n                if (arr[i] == arr[j]) { System.out.println(arr[i]); break; }\n            }\n        }\n    }\n}'
  },
  {
    id: 4, title: 'Count Even and Odd Numbers', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Modulo'],
    description: 'Write a program to find the number of even and odd integers in a given array.',
    examples: [
      { input: 'arr = {10,20,21,30,31,40,41}', output: 'Even: 4, Odd: 3' },
      { input: 'arr = {1,3,5}', output: 'Even: 0, Odd: 3' },
      { input: 'arr = {2,4,6}', output: 'Even: 3, Odd: 0' },
      { input: 'arr = {1}', output: 'Even: 0, Odd: 1' },
      { input: 'arr = {0}', output: 'Even: 1, Odd: 0' },
      { input: 'arr = {-2,-3,-4}', output: 'Even: 2, Odd: 1' }
    ],
    hints: ['Use modulo operator (%) to check even/odd.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 21, 30, 31, 40, 41};\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 21, 30, 31, 40, 41};\n        int even = 0, odd = 0;\n        for (int x : arr) { if (x % 2 == 0) even++; else odd++; }\n        System.out.println("Even: " + even + ", Odd: " + odd);\n    }\n}'
  },
  {
    id: 5, title: 'Common Elements in Two Arrays', category: 'arrays', difficulty: 'medium', type: 'coding', tags: ['Array', 'Search'],
    description: 'Write a program to find the common elements between two sorted arrays.',
    examples: [
      { input: 'arr1 = {1,3,4,5,7}, arr2 = {2,3,5,6}', output: '3\n5' },
      { input: 'arr1 = {1,2}, arr2 = {3,4}', output: '' },
      { input: 'arr1 = {1,1,2}, arr2 = {1}', output: '1' },
      { input: 'arr1 = {1,2,3,4}, arr2 = {1,2,3,4}', output: '1\n2\n3\n4' },
      { input: 'arr1 = {5}, arr2 = {5}', output: '5' },
      { input: 'arr1 = {1,2,2,3}, arr2 = {2,3,3,4}', output: '2\n3' }
    ],
    hints: ['Use nested loops to compare arr1 elements with arr2 elements.', 'To avoid duplicates in output, skip consecutive repeated values in arr1 (use i > 0 check).', 'When a match is found in arr2, break immediately and move to next arr1 element.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] a1 = {1,3,4,5,7}, a2 = {2,3,5,6};\n        // Your code here - find and print common elements\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] a1 = {1,3,4,5,7}, a2 = {2,3,5,6};\n        for (int i = 0; i < a1.length; i++) {\n            if (i > 0 && a1[i] == a1[i - 1]) continue;\n            for (int y : a2) {\n                if (a1[i] == y) { System.out.println(a1[i]); break; }\n            }\n        }\n    }\n}'
  },
  {
    id: 35, title: 'Sum of Array Elements', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Sum'],
    description: 'Find the sum of all elements in an array.',
    examples: [
      { input: 'arr = {1, 2, 3, 4}', output: '10' },
      { input: 'arr = {1}', output: '1' },
      { input: 'arr = {5, 5, 5}', output: '15' },
      { input: 'arr = {-1, -2, -3}', output: '-6' },
      { input: 'arr = {0}', output: '0' },
      { input: 'arr = {10, -5, 3, -2}', output: '6' }
    ],
    hints: ['Initialize sum to 0 and iterate through the array.', 'Add each element to the sum using += operator.', 'Use enhanced for loop (for-each) for cleaner iteration.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4};\n        int sum = 0;\n        // Your code here - add all elements to sum\n        System.out.println("Sum: " + sum);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4};\n        int sum = 0;\n        for (int x : arr) sum += x;\n        System.out.println("Sum: " + sum);\n    }\n}'
  },
  {
    id: 36, title: 'Find Largest Element', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Max'],
    description: 'Find the largest number in an array.',
    examples: [
      { input: 'arr = {3, 7, 2, 9, 5}', output: '9' },
      { input: 'arr = {1}', output: '1' },
      { input: 'arr = {5, 4, 3, 2, 1}', output: '5' },
      { input: 'arr = {10, 10, 10}', output: '10' },
      { input: 'arr = {-5, -1, -10}', output: '-1' },
      { input: 'arr = {100, 50, 75, 200}', output: '200' }
    ],
    hints: ['Always initialize max with the first element, not Integer.MIN_VALUE.', 'Compare each subsequent element and update max if a larger value is found.', 'Works correctly with negative numbers and duplicates.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 7, 2, 9, 5};\n        int max = arr[0];\n        // Your code here - find and update max\n        System.out.println("Largest: " + max);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 7, 2, 9, 5};\n        int max = arr[0];\n        for (int x : arr) if (x > max) max = x;\n        System.out.println("Largest: " + max);\n    }\n}'
  },

  // ===== STRINGS =====
  {
    id: 6, title: 'Palindrome Check', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'StringBuilder'],
    description: 'Write a program to check whether a given string is a palindrome or not (case-insensitive). [OPTIONAL: Handle multi-word palindromes by ignoring spaces]',
    examples: [
      { input: 'str = "madam"', output: 'true', optional: false },
      { input: 'str = "hello"', output: 'false', optional: false },
      { input: 'str = "Aba"', output: 'true', optional: false },
      { input: 'str = "a"', output: 'true', optional: false },
      { input: 'str = "racecar"', output: 'true', optional: false },
      { input: 'str = "ab"', output: 'false', optional: false },
      { input: 'str = "A"', output: 'true', optional: false },
      { input: 'str = "race car"', output: 'true (ignoring spaces)', optional: true },
      { input: 'str = "a man a plan a canal panama"', output: 'true (ignoring spaces)', optional: true },
      { input: 'str = "hello world"', output: 'false (ignoring spaces)', optional: true }
    ],
    hints: ['Convert to lowercase before comparing to handle case-insensitivity.', 'Reverse the string using StringBuilder.reverse() and compare with original.', 'OPTIONAL: For multi-word check, remove spaces before reversing.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "madam";\n        String strLower = str.toLowerCase();\n        // Solution 1: Basic palindrome check\n        String rev = new StringBuilder(strLower).reverse().toString();\n        boolean isPalindrome = strLower.equals(rev);\n        System.out.println(isPalindrome ? "Palindrome" : "Not a Palindrome");\n    }\n}',
    solution: 'public class Main {\n    // SOLUTION 1: Basic single-word palindrome (Mandatory - case insensitive)\n    static boolean isPalindrome(String str) {\n        String strLower = str.toLowerCase();\n        String rev = new StringBuilder(strLower).reverse().toString();\n        return strLower.equals(rev);\n    }\n    \n    // SOLUTION 2 (OPTIONAL): Multi-word palindrome ignoring spaces and case\n    static boolean isPalindromeMultiWord(String str) {\n        String noSpace = str.replaceAll(" ", "").toLowerCase();\n        String rev = new StringBuilder(noSpace).reverse().toString();\n        return noSpace.equals(rev);\n    }\n    \n    public static void main(String[] args) {\n        // Test basic palindrome\n        System.out.println(isPalindrome("madam")); // true\n        System.out.println(isPalindrome("Aba")); // true\n        System.out.println(isPalindrome("hello")); // false\n        \n        // Test multi-word palindrome (OPTIONAL)\n        System.out.println(isPalindromeMultiWord("race car")); // true\n    }\n}'
  },
  {
    id: 7, title: 'Reverse Words (Characters)', category: 'strings', difficulty: 'medium', type: 'coding', tags: ['String', 'Manipulation'],
    description: 'Write a program to reverse each word\'s characters in a sentence without using StringBuilder.reverse().',
    examples: [
      { input: '"Hello World"', output: '"olleH dlroW"' },
      { input: '"Java"', output: '"avaJ"' },
      { input: '"a b c"', output: '"a b c"' },
      { input: '"abc def ghi"', output: '"cba fed ihg"' }
    ],
    hints: ['Split the sentence into words using split(\" \").', 'For each word, reverse characters by iterating backward through the word.', 'Append each reversed word to result, maintaining spaces between words.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        String[] words = str.split(" ");\n        StringBuilder result = new StringBuilder();\n        // Your code here - reverse each word and append to result\n        System.out.println(result.toString().trim());\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        String[] words = str.split(" ");\n        StringBuilder result = new StringBuilder();\n        for (String w : words) {\n            for (int j = w.length()-1; j >= 0; j--) result.append(w.charAt(j));\n            result.append(" ");\n        }\n        System.out.println(result.toString().trim());\n    }\n}'
  },
  {
    id: 8, title: 'Count Vowels and Consonants', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Character'],
    description: 'Write a program to count the total number of vowels and consonants in a string (ignore spaces and non-alphabetic characters).',
    examples: [
      { input: 'str = "Hello World"', output: 'Vowels: 3, Consonants: 7' },
      { input: 'str = "AEIOU"', output: 'Vowels: 5, Consonants: 0' },
      { input: 'str = "bcdfg"', output: 'Vowels: 0, Consonants: 5' },
      { input: 'str = "a"', output: 'Vowels: 1, Consonants: 0' },
      { input: 'str = "123!@#"', output: 'Vowels: 0, Consonants: 0' }
    ],
    hints: ['Convert string to lowercase to handle both uppercase and lowercase vowels.', 'Check if character is a vowel using indexOf() or a series of comparisons.', 'For consonants, check if it\'s alphabetic (a-z) but not a vowel.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        int vowels = 0, consonants = 0;\n        // Your code here\n        System.out.println("Vowels: " + vowels + ", Consonants: " + consonants);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        int vowels = 0, consonants = 0;\n        for (char ch : str.toLowerCase().toCharArray()) {\n            if ("aeiou".indexOf(ch) >= 0) vowels++;\n            else if (ch >= \'a\' && ch <= \'z\') consonants++;\n        }\n        System.out.println("Vowels: " + vowels + ", Consonants: " + consonants);\n    }\n}'
  },
  {
    id: 9, title: 'Anagram Check', category: 'strings', difficulty: 'medium', type: 'coding', tags: ['String', 'Sorting'],
    description: 'Check whether two strings are anagrams of each other (case-insensitive).',
    examples: [
      { input: 's1 = "Listen", s2 = "Silent"', output: 'Anagrams' },
      { input: 's1 = "Hello", s2 = "World"', output: 'Not anagrams' },
      { input: 's1 = "abc", s2 = "bca"', output: 'Anagrams' },
      { input: 's1 = "Abc", s2 = "cab"', output: 'Anagrams' },
      { input: 's1 = "a", s2 = "a"', output: 'Anagrams' },
      { input: 's1 = "a", s2 = "b"', output: 'Not anagrams' },
      { input: 's1 = "", s2 = ""', output: 'Anagrams' }
    ],
    hints: ['Two strings are anagrams if they contain the same characters with the same frequency.', 'Convert both strings to lowercase to handle case-insensitivity.', 'Convert each string to char array, sort both arrays, then compare if they\'re equal.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        String s1 = "Listen";\n        String s2 = "Silent";\n        char[] a = s1.toLowerCase().toCharArray();\n        char[] b = s2.toLowerCase().toCharArray();\n        // Your code here - sort and compare\n        System.out.println(/*result*/ ? "Anagrams" : "Not anagrams");\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        String s1 = "Listen";\n        String s2 = "Silent";\n        char[] a = s1.toLowerCase().toCharArray();\n        char[] b = s2.toLowerCase().toCharArray();\n        Arrays.sort(a);\n        Arrays.sort(b);\n        System.out.println(Arrays.equals(a, b) ? "Anagrams" : "Not anagrams");\n    }\n}'
  },
  {
    id: 10, title: 'Convert to Lowercase', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Basics'],
    description: 'Write a program to convert a given string into lowercase.',
    examples: [
      { input: '"HELLO WORLD"', output: '"hello world"' },
      { input: '"HeLLo"', output: '"hello"' },
      { input: '"hello"', output: '"hello"' },
      { input: '"A"', output: '"a"' },
      { input: '"123ABC"', output: '"123abc"' }
    ],
    hints: ['Use the built-in toLowerCase() method from the String class.', 'The method returns a new string; original string is unchanged (strings are immutable).', 'Non-alphabetic characters (numbers, special chars) remain unchanged.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "HELLO WORLD";\n        // Your code here - convert to lowercase\n        System.out.println("Lowercase: " + result);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "HELLO WORLD";\n        String result = str.toLowerCase();\n        System.out.println("Lowercase: " + result);\n    }\n}'
  },
  {
    id: 13, title: 'Reverse Word Order', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Split'],
    description: 'Given a string, reverse the order of words.',
    examples: [
      { input: 'str = "I Love Java"', output: 'Java Love I' },
      { input: 'str = "Hello"', output: 'Hello' },
      { input: 'str = "a b c"', output: 'c b a' },
      { input: 'str = "one two three four"', output: 'four three two one' },
      { input: 'str = "Programming"', output: 'Programming' }
    ],
    hints: ['Split the string into words using split(\" \") method.', 'Iterate backward from the last word to the first word.', 'Append each word to result followed by a space, then trim() the final result.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "I Love Java";\n        String[] words = str.split(" ");\n        StringBuilder result = new StringBuilder();\n        // Your code here - iterate backward and append words\n        System.out.println(result.toString().trim());\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "I Love Java";\n        String[] words = str.split(" ");\n        StringBuilder result = new StringBuilder();\n        for (int i = words.length - 1; i >= 0; i--) result.append(words[i]).append(" ");\n        System.out.println(result.toString().trim());\n    }\n}'
  },
  {
    id: 14, title: 'Reverse a String', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Reverse'],
    description: 'Write a program to reverse a given string.',
    examples: [
      { input: 'str = "Java"', output: 'avaJ' },
      { input: 'str = "Hello"', output: 'olleH' },
      { input: 'str = "a"', output: 'a' },
      { input: 'str = "12345"', output: '54321' },
      { input: 'str = "ab"', output: 'ba' }
    ],
    hints: ['Use StringBuilder class with reverse() method for efficient reversal.', 'Convert StringBuilder to String using toString() method.', 'Alternative: Use a loop to iterate from end to start and build reversed string.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Java";\n        // Your code here - reverse the string\n        System.out.println("Reversed: " + result);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Java";\n        String result = new StringBuilder(str).reverse().toString();\n        System.out.println("Reversed: " + result);\n    }\n}'
  },
  {
    id: 39, title: 'Count Vowels Only', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Vowels'],
    description: 'Count the number of vowels (a, e, i, o, u) in a string (case-insensitive).',
    examples: [
      { input: '"Hello"', output: '2' },
      { input: '"aeiou"', output: '5' },
      { input: '"bcdfg"', output: '0' },
      { input: '"a"', output: '1' },
      { input: '"AEIOU"', output: '5' },
      { input: '"123!@#"', output: '0' }
    ],
    hints: ['Convert string to lowercase to handle both uppercase and lowercase vowels uniformly.', 'Convert string to char array using toCharArray() for efficient character iteration.', 'Check if each character is in the vowel set using indexOf() - it returns >= 0 if found.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello";\n        int count = 0;\n        // Your code here - count vowels\n        System.out.println("Vowels: " + count);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello";\n        int count = 0;\n        for (char c : str.toLowerCase().toCharArray())\n            if ("aeiou".indexOf(c) >= 0) count++;\n        System.out.println("Vowels: " + count);\n    }\n}'
  },
];