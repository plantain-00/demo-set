use std::rc::Rc;
use std::cell::RefCell;
use std::time::SystemTime;

/// <summary>
///     if queens is {2, 0, 3, 1},
///     then it means {(0,2), (1,0), (2,3), (3,1)}.
///     of course it is a valid result.
/// </summary>
/// <param name="queens"></param>
/// <param name="queens_length"></param>
/// <returns></returns>
fn is_valid(queens: Rc<RefCell<Vec<i32>>>, queens_length: i32) -> bool {
    // the last point
    let px = queens_length - 1;
    let py = queens.borrow_mut()[px as usize];

    for i in 0..px {
        // |
        if px == i {
            return false;
        }
        // -
        if py == queens.borrow_mut()[i as usize] {
            return false;
        }
        let delta_x = px - i;
        let delta_y = py - queens.borrow_mut()[i as usize];
        // \
        if delta_x == delta_y {
            return false;
        }
        // /
        if delta_x + delta_y == 0 {
            return false;
        }
    }
    return true;
}

fn xyz(result: i32,
       max_depth: i32,
       depth: i32,
       queens: Rc<RefCell<Vec<i32>>>,
       queens_length: i32)
       -> i32 {
    if max_depth == 1 {
        return result + 1;
    }
    let mut local_result = result;
    for i in 0..max_depth {
        queens.borrow_mut()[queens_length as usize] = i;
        if depth == 1 {
            local_result = xyz(local_result,
                               max_depth,
                               depth + 1,
                               queens.clone(),
                               queens_length + 1);
            continue;
        }
        if !is_valid(queens.clone(), queens_length + 1) {
            continue;
        }
        if depth == max_depth {
            local_result = local_result + 1;
        } else {
            local_result = xyz(local_result,
                               max_depth,
                               depth + 1,
                               queens.clone(),
                               queens_length + 1);
        }
    }
    return local_result;
}

fn main() {
    let mut counts = Vec::new();
    let now = SystemTime::now();
    for i in 0..12 {
        let result = xyz(0,
                         i + 1,
                         1,
                         Rc::new(RefCell::new(vec![0; (i + 1) as usize])),
                         0);
        counts.push(result);
    }
    let seconds = SystemTime::now().duration_since(now);
    for count in counts {
        println!("{}", count);
    }
    if seconds.is_ok() {
        let duration = seconds.ok().unwrap();
        println!("{} s, {} ns", duration.as_secs(), duration.subsec_nanos());// 0.32 - 0.37
    }
}
