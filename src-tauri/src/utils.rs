use std::ops::{Add, Mul};

pub fn to_percentage<T>(amount: T, total: T) -> f64
where
    T: Add<Output = T> + Mul<Output = T> + Copy + Into<f64>,
{
    amount.clone().into() / total.clone().into() * 100f64
}

/// Adds two numbers
///
/// ### Arguments
///
/// * `a` - A 32 bit integer
/// * `b` - A 32 bit integer
///
/// Examples
/// ```
/// use disk_analyzer_lib::utils::add;
/// let ans = add(1, 2);
/// assert_eq!(ans, 3);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn calculate_available_percentage(total: u64, available: u64) -> f64 {
    (available as f64 / total as f64) * 100f64
}

pub fn calculate_used_percentage(total: u64, available: u64) -> f64 {
    ((total as f64 - available as f64) / total as f64) * 100f64
}

pub fn calculate_usage_change_percentage(previous_available: u64, current_available: u64) -> f64 {
    if previous_available == 0 {
        return 0f64;
    }

    let change = previous_available as i64 - current_available as i64;
    (change as f64 / previous_available as f64) * 100f64
}

pub fn round_to_two_decimal_places(value: f64) -> f64 {
    (value * 100.0).round() / 100.0
}

mod tests {
    #[test]
    fn test_to_percentage() {
        let actual = super::to_percentage(45, 73);
        let expected = 61.64383561643836f64;
        assert_eq!(actual, expected);
    }

    #[test]
    fn test_calculate_usage_change_percentage() {
        let test_cases = vec![
            (1000u64, 900u64, 10f64),
            (1000u64, 1100u64, -10f64),
            (2000u64, 1500u64, 25f64),
            (500u64, 250u64, 50f64),
            (0u64, 0u64, 0f64),       // Edge case: previous is zero
            (1000u64, 1000u64, 0f64), // No change
        ];

        for (previous, current, expected) in test_cases {
            let actual = super::calculate_usage_change_percentage(previous, current);
            assert_eq!(actual, expected);
        }
    }

    #[test]
    fn test_round_to_two_decimal_places() {
        let test_cases = vec![
            (12.34567f64, 12.35f64),
            (0.123456f64, 0.12f64),
            (99.9999f64, 100.0f64),
            (1.005f64, 1.00f64), // 100.49 precision error
            (2.674f64, 2.67f64),
        ];

        for (input, expected) in test_cases {
            let actual = super::round_to_two_decimal_places(input);
            assert_eq!(actual, expected);
        }
    }

    #[test]
    fn test_calculate_available_percentage() {
        // Test basic calculation: 50GB available out of 100GB should be 50%
        assert_eq!(super::calculate_available_percentage(100, 50), 50.0);

        // Test 100% available
        assert_eq!(super::calculate_available_percentage(100, 100), 100.0);

        // Test 0% available
        assert_eq!(super::calculate_available_percentage(100, 0), 0.0);

        // Test with larger numbers (1TB total, 500GB available)
        assert_eq!(
            super::calculate_available_percentage(1_000_000_000_000, 500_000_000_000),
            50.0
        );

        // Test with fractional results
        let result = super::calculate_available_percentage(1000, 333);
        assert!((result - 33.3).abs() < 0.1);
    }

    #[test]
    fn test_calculate_used_percentage() {
        // Test basic calculation: 50GB used out of 100GB should be 50%
        assert_eq!(super::calculate_used_percentage(100, 50), 50.0);

        // Test 0% used (all available)
        assert_eq!(super::calculate_used_percentage(100, 100), 0.0);

        // Test 100% used (nothing available)
        assert_eq!(super::calculate_used_percentage(100, 0), 100.0);

        // Test with larger numbers (1TB total, 500GB available means 500GB used)
        assert_eq!(
            super::calculate_used_percentage(1_000_000_000_000, 500_000_000_000),
            50.0
        );

        // Test with fractional results
        let result = super::calculate_used_percentage(1000, 333);
        assert!((result - 66.7).abs() < 0.1);
    }
}
