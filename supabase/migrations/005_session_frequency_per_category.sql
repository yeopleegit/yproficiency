-- session_frequency: 카테고리별 분리 집계 (no skillId 케이스)
-- 반환 컬럼이 추가되므로 기존 함수를 먼저 DROP 한 뒤 재생성한다.

DROP FUNCTION IF EXISTS session_frequency(INTEGER, INTEGER, TEXT);

CREATE OR REPLACE FUNCTION session_frequency(
    p_skill_id INTEGER DEFAULT NULL,
    p_days INTEGER DEFAULT 30,
    p_today TEXT DEFAULT NULL
)
RETURNS TABLE (
    date TEXT,
    count BIGINT,
    category_id INTEGER,
    category_name TEXT
) AS $$
DECLARE
    anchor DATE := COALESCE(p_today::DATE, CURRENT_DATE);
BEGIN
    IF p_skill_id IS NOT NULL THEN
        RETURN QUERY
        SELECT se.practiced_at::DATE::TEXT, COUNT(*), NULL::INTEGER, NULL::TEXT
        FROM sessions se
        WHERE se.skill_id = p_skill_id
          AND se.user_id = auth.uid()
          AND se.practiced_at >= (anchor - (p_days || ' days')::INTERVAL)::TEXT
        GROUP BY se.practiced_at::DATE
        ORDER BY se.practiced_at::DATE;
    ELSE
        RETURN QUERY
        SELECT se.practiced_at::DATE::TEXT, COUNT(*), c.id, c.name
        FROM sessions se
        JOIN skills s ON s.id = se.skill_id
        JOIN items i ON i.id = s.item_id
        JOIN categories c ON c.id = i.category_id
        WHERE se.user_id = auth.uid()
          AND se.practiced_at >= (anchor - (p_days || ' days')::INTERVAL)::TEXT
        GROUP BY se.practiced_at::DATE, c.id, c.name, c.sort_order
        ORDER BY se.practiced_at::DATE, c.sort_order, c.name;
    END IF;
END;
$$ LANGUAGE plpgsql;
