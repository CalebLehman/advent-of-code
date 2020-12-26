import sys

def is_two_sum(val, nums):
    complements = set()
    for num in nums:
        if num in complements: return True
        complements.add(val - num)
    return False

N   = int(sys.argv[1])
val = None
with sys.stdin as f:
    nums = []
    for _ in range(N):
        nums.append(int(f.readline()))
    for line in f:
        val = int(line)
        if not is_two_sum(val, nums): break
        nums = nums[1:] + [val]
print(val)
