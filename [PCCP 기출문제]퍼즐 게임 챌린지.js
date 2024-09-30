/**
 * [이진 탐색]
 *
 * 난이도와 소요 시간 (배열의 길이 30만개)
 * diffs: [1, 5, 3] (값 최대 10만)
 * times: [2, 4, 7] (값 최대 1만)
 *
 * 제한 시간
 * limit: 30
 *
 * 요구 조건
 * - 제한 시간 내에 모든 퍼즐을 푸는데, 최소 숙련도 구하기.
 * - 난이도(diff)가 숙련도(level)보다 높다면 diff - level 번만큼 틀린다.
 * 틀릴 때마다 현재 문제 시간(time_cur)+ 이전 문제 푸는 시간(prev_time)을 사용한다.
 * => (diff-level) * (time_cur + prev_time)
 *
 * - 난이도(diff)가 숙련도(level)보다 낮거나 같다면 현재 시간(time_cur)만 사용한다.
 * => time_cur
 *
 */

function solution(diffs, times, limit) {
  const canSolveWithLevel = (level) => {
    let temp_limit = limit;
    const n = diffs.length;
    let prev_time = times[0];

    for (let i = 0; i < n; i++) {
      const cur_time = times[i];
      const diff = diffs[i];

      // 나보다 문제의 수준이 더 높다.
      if (level < diff) {
        const mistakes = diff - level;
        temp_limit -= mistakes * (cur_time + prev_time) + cur_time;
      } else {
        // 문제 수준이 낮다.
        temp_limit -= cur_time;
      }

      if (temp_limit < 0) {
        return false;
      }

      prev_time = cur_time;
    }

    return temp_limit >= 0;
  };

  // Math.min을 사용하거나 Math.max를 사용할 경우 런타임 에러가 뜬다.
  // 따라서 문제에서 주어진 최소값과 최대값을 직접 기입하여 시간 복잡도를 줄인다.
  let left = 1;
  let right = 1000000;
  let answer = right;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canSolveWithLevel(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

solution([1, 5, 3], [2, 4, 7], 30);
