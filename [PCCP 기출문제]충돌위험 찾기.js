/**
 * 요구 조건
 * - 최단 경로로 이동할 때, 여러가지 일 경우 r좌표가 c좌표보다 먼저 이동하게 한다.
 *
 * 원하는 결과
 * - 숫자가 한 위치에 같이 있는 순간을 더해서 최종 그 값을 return한다.
 *
 * points : 운송 포인트 2차원 배열 [[3, 2], [6, 4], [4, 7], [1, 4]]
 * [3, 2]의 경우 3번째 행(index로는 2), 2번째 열(index로는 1)에 시작지점 위치한다.
 *
 * routes : 운송 경로를 담은 2차원 배열 [[4, 2], [1, 3], [2, 4]]
 * [4, 2]의 경우 points의 4번째에 위치하는 숫자가 2로 향한다.
 *
 * TODO LIST
 * 0. map으로 로봇의 거쳐간 경로 횟수를 기록할 것이다.
 * 1. routes를 순회하면서 startPointNumber, endPointNumber를 추출한다.
 * 2. startPointNumber와 endPointNumber를 map에 각인시키기 위한 함수에 넘긴다.
 * 3. 각인하는 함수에서는 startPointNumber, endPointNumber로 각 point 위치를 추출해서 시작 지점, 끝 지점을 알아낸다.
 * 4. 임시 변수 x, y를 두고 endPointY, endPointX와 같을 때까지 while문으로 각 좌표에 1을 더한다.
 * 5. map을 순회하면서 value가 2 이상인 숫자를 카운트해서 return한다 (이게 정답이다.)
 */
function solution(points, routes) {
  const movedMap = new Map();

  function getCoordinate(startPointNumber, endPointNumber) {
    const [startY, startX] = points[startPointNumber - 1];
    const [endY, endX] = points[endPointNumber - 1];
    return [
      [startY, startX],
      [endY, endX],
    ];
  }

  function writeMap(startPointNumber, endPointNumber) {
    const [startPointCoordinate, endPointCoordinate] = getCoordinate(startPointNumber, endPointNumber);
    const [startY, startX] = startPointCoordinate;
    const [endY, endX] = endPointCoordinate;
    let currentY = startY;
    let currentX = startX;

    let timer = 0;

    while (currentY !== endY || currentX !== endX) {
      timer++;
      if (currentY !== endY) {
        currentY += currentY > endY ? -1 : 1;
      } else if (currentX !== endX) {
        currentX += currentX > endX ? -1 : 1;
      }
      movedMap.set(`${currentY}_${currentX}_${timer}`, (movedMap.get(`${currentY}_${currentX}_${timer}`) || 0) + 1);
    }
  }

  routes.forEach(([startPointNumber, endPointNumber]) => {
    writeMap(startPointNumber, endPointNumber);
  });

  let answer = 0;

  for (let value of movedMap.values()) {
    if (value >= 2) {
      answer++;
    }
  }
  return answer;
}

console.log(
  solution(
    [
      [3, 2],
      [6, 4],
      [4, 7],
      [1, 4],
    ],
    [
      [4, 2],
      [1, 3],
      [2, 4],
    ]
  )
);
