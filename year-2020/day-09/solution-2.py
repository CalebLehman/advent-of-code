import sys
N = int(sys.argv[1])

def is_two_sum(target, nums):
    complements = set()
    for num in nums:
        if num in complements: return True
        complements.add(target - num)
    return False

def find_invalid(nums):
    preamble = nums[:N]
    for num in nums[N:]:
        val = int(num)
        if not is_two_sum(val, preamble):
            return val
        preamble = preamble[1:] + [val]

def break_encryption(nums):
    invalid = find_invalid(nums)
    total = 0
    j = 0
    subarray = []
    for i in range(len(nums)):
        while j < i + 2 or total < invalid:
            subarray.append(nums[j])
            total += nums[j]
            j += 1
        if total == invalid:
            return min(subarray) + max(subarray)
        else:
            total   -= subarray[0]
            subarray = subarray[1:]

with sys.stdin as f:
    nums = list(map(int, f.readlines()))

print(break_encryption(nums))
