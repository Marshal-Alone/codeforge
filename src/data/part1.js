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
      { input: 'arr = {-1,-2,-3}', output: '-2' }
    ],
    constraints: 'Array has at least 2 elements.',
    hints: ['Track both largest and second largest as you iterate.', 'When you find a new largest, the old largest becomes second largest.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {12, 35, 1, 10, 34, 1};\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {12, 35, 1, 10, 34, 1};\n        int largest = arr[0], secondLargest = Integer.MIN_VALUE;\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > largest) { secondLargest = largest; largest = arr[i]; }\n            else if (arr[i] > secondLargest && arr[i] != largest) secondLargest = arr[i];\n        }\n        System.out.println(secondLargest);\n    }\n}'
  },
  {
    id: 2, title: 'Q2: Reverse Array In-Place', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Two Pointers'],
    description: 'Write a program to reverse an array in-place without using extra space.',
    examples: [
      { input: 'arr = {1, 2, 3, 4}', output: '[4, 3, 2, 1]' },
      { input: 'arr = {5}', output: '[5]' },
      { input: 'arr = {}', output: '[]' }
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
      { input: 'arr = {1,2,3}', output: '' }
    ],
    hints: ['Compare each element with every other element.', 'Skip elements you have already reported as duplicates.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 20, 30, 30, 30, 40, 50, 50};\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int arr[] = {10, 20, 20, 30, 30, 30, 40, 50, 50};\n        System.out.println("Duplicates:");\n        for (int i = 0; i < arr.length; i++) {\n            boolean alreadySeen = false;\n            for (int k = 0; k < i; k++) {\n                if (arr[k] == arr[i]) { alreadySeen = true; break; }\n            }\n            if (alreadySeen) continue;\n            for (int j = i + 1; j < arr.length; j++) {\n                if (arr[i] == arr[j]) { System.out.println(arr[i]); break; }\n            }\n        }\n    }\n}'
  },
  {
    id: 4, title: 'Count Even and Odd Numbers', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Modulo'],
    description: 'Write a program to find the number of even and odd integers in a given array.',
    examples: [
      { input: 'arr = {10,20,21,30,31,40,41}', output: 'Even: 4, Odd: 3' },
      { input: 'arr = {1,3,5}', output: 'Even: 0, Odd: 3' },
      { input: 'arr = {2,4,6}', output: 'Even: 3, Odd: 0' }
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
      { input: 'arr1 = {1,1,2}, arr2 = {1}', output: '1' }
    ],
    hints: ['Compare each element of arr1 with each of arr2.', 'Since the arrays are sorted, skip repeated values in arr1 to avoid duplicate output.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] a1 = {1,3,4,5,7}, a2 = {2,3,5,6};\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] a1 = {1,3,4,5,7}, a2 = {2,3,5,6};\n        System.out.println("Common elements:");\n        for (int i = 0; i < a1.length; i++) {\n            if (i > 0 && a1[i] == a1[i - 1]) continue;\n            for (int y : a2) {\n                if (a1[i] == y) { System.out.println(a1[i]); break; }\n            }\n        }\n    }\n}'
  },
  {
    id: 35, title: 'Sum of Array Elements', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Sum'],
    description: 'Find the sum of all elements in an array.',
    examples: [{ input: 'arr = {1, 2, 3, 4}', output: '10' }],
    hints: ['Iterate through the array and keep a running total.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4};\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4};\n        int sum = 0;\n        for (int x : arr) sum += x;\n        System.out.println("Sum: " + sum);\n    }\n}'
  },
  {
    id: 36, title: 'Find Largest Element', category: 'arrays', difficulty: 'easy', type: 'coding', tags: ['Array', 'Max'],
    description: 'Find the largest number in an array.',
    examples: [{ input: 'arr = {3, 7, 2, 9, 5}', output: '9' }],
    hints: ['Initialize max with first element and compare with rest.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 7, 2, 9, 5};\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 7, 2, 9, 5};\n        int max = arr[0];\n        for (int x : arr) if (x > max) max = x;\n        System.out.println("Largest: " + max);\n    }\n}'
  },

  // ===== STRINGS =====
  {
    id: 6, title: 'Palindrome Check', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'StringBuilder'],
    description: 'Write a program to check whether a given string is a palindrome or not.',
    examples: [
      { input: 'str = "madam"', output: 'true' },
      { input: 'str = "hello"', output: 'false' },
      { input: 'str = "Aba"', output: 'true' }
    ],
    hints: ['Reverse the string and compare with original.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "madam";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "madam";\n        String rev = new StringBuilder(str).reverse().toString();\n        System.out.println(str.equals(rev) ? str + " is a palindrome" : str + " is not a palindrome");\n    }\n}'
  },
  {
    id: 7, title: 'Reverse Words (Characters)', category: 'strings', difficulty: 'medium', type: 'coding', tags: ['String', 'Manipulation'],
    description: 'Write a program to reverse each word\'s characters in a sentence without using library methods.',
    examples: [{ input: '"Hello World"', output: '"olleH dlroW"' }],
    hints: ['Split into words, reverse each word individually.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        String[] words = str.split(" ");\n        StringBuilder result = new StringBuilder();\n        for (String w : words) {\n            StringBuilder rev = new StringBuilder();\n            for (int j = w.length()-1; j >= 0; j--) rev.append(w.charAt(j));\n            result.append(rev).append(" ");\n        }\n        System.out.println(result.toString().trim());\n    }\n}'
  },
  {
    id: 8, title: 'Count Vowels and Consonants', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Character'],
    description: 'Write a program to count the total number of vowels and consonants in a string.',
    examples: [
      { input: 'str = "Hello World"', output: 'Vowels: 3, Consonants: 7' },
      { input: 'str = "AEIOU"', output: 'Vowels: 5, Consonants: 0' }
    ],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        int v = 0, c = 0;\n        for (char ch : str.toLowerCase().toCharArray()) {\n            if ("aeiou".indexOf(ch) >= 0) v++;\n            else if (ch >= \'a\' && ch <= \'z\') c++;\n        }\n        System.out.println("Vowels: " + v + ", Consonants: " + c);\n    }\n}'
  },
  {
    id: 9, title: 'Anagram Check', category: 'strings', difficulty: 'medium', type: 'coding', tags: ['String', 'Sorting'],
    description: 'Check whether two strings are anagrams of each other.',
    examples: [{ input: 's1 = "Listen", s2 = "Silent"', output: 'Anagrams' }],
    hints: ['Sort both strings and compare.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        String s1 = "Listen", s2 = "Silent";\n        // Your code here\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        String s1 = "Listen", s2 = "Silent";\n        char[] a = s1.toLowerCase().toCharArray(), b = s2.toLowerCase().toCharArray();\n        Arrays.sort(a); Arrays.sort(b);\n        System.out.println(Arrays.equals(a, b) ? "Anagrams" : "Not anagrams");\n    }\n}'
  },
  {
    id: 10, title: 'Convert to Lowercase', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Basics'],
    description: 'Write a program to convert a given string into lowercase.',
    examples: [{ input: '"HELLO WORLD"', output: '"hello world"' }],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "HELLO WORLD";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "HELLO WORLD";\n        System.out.println("Lowercase: " + str.toLowerCase());\n    }\n}'
  },
  {
    id: 13, title: 'Reverse Word Order', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Split'],
    description: 'Given a string, reverse the order of words.',
    examples: [
      { input: 'str = "I Love Java"', output: 'Java Love I' },
      { input: 'str = "Hello"', output: 'Hello' }
    ],
    hints: ['Split by space, iterate from end to start.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "I Love Java";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "I Love Java";\n        String[] words = str.split(" ");\n        StringBuilder result = new StringBuilder();\n        for (int i = words.length - 1; i >= 0; i--) result.append(words[i]).append(" ");\n        System.out.println(result.toString().trim());\n    }\n}'
  },
  {
    id: 14, title: 'Reverse a String', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Reverse'],
    description: 'Write a program to reverse a given string.',
    examples: [{ input: 'str = "Java"', output: 'avaJ' }],
    hints: ['Use StringBuilder reverse() or loop from end.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Java";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Java";\n        System.out.println("Reversed: " + new StringBuilder(str).reverse());\n    }\n}'
  },
  {
    id: 39, title: 'Count Vowels Only', category: 'strings', difficulty: 'easy', type: 'coding', tags: ['String', 'Vowels'],
    description: 'Count the number of vowels (a, e, i, o, u) in a string.',
    examples: [{ input: '"Hello"', output: '2' }],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "Hello";\n        int count = 0;\n        for (char c : str.toLowerCase().toCharArray())\n            if ("aeiou".indexOf(c) >= 0) count++;\n        System.out.println("Vowels: " + count);\n    }\n}'
  },
];