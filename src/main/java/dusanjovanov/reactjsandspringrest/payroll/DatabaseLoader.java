package dusanjovanov.reactjsandspringrest.payroll;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
	private final EmployeeRepository repository;

	@Autowired
	public DatabaseLoader(EmployeeRepository repository) {
		super();
		this.repository = repository;
	}

	@Override
	public void run(String... args) throws Exception {
		ArrayList<Employee> employees = new ArrayList<Employee>();
		for (int i = 0; i < 100; i++) {
			employees.add(new Employee("Some", "Employee " + i, "something"));
		}
		repository.saveAll(employees);
	}

}
