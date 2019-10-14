package dusanjovanov.reactjsandspringrest.payroll;

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
		repository.save(new Employee("Dusan", "Jovanov", "programmer"));
	}

}
