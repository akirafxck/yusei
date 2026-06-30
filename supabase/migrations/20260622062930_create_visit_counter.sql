CREATE TABLE visit_counter (
  id BIGINT PRIMARY KEY DEFAULT 1,
  count BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert the initial row
INSERT INTO visit_counter (id, count) VALUES (1, 0);

-- Enable RLS
ALTER TABLE visit_counter ENABLE ROW LEVEL SECURITY;

-- Create policies for public read and write (visit counter needs to be public)
CREATE POLICY "select_visit_counter" ON visit_counter FOR SELECT
  TO public USING (true);

CREATE POLICY "update_visit_counter" ON visit_counter FOR UPDATE
  TO public USING (true) WITH CHECK (true);

-- Create a function to increment the counter
CREATE OR REPLACE FUNCTION increment_visit_count()
RETURNS void AS $$
BEGIN
  UPDATE visit_counter SET count = count + 1 WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;